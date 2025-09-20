import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('X-Frame-Options', 'DENY')
    res.setHeader('X-XSS-Protection', '1; mode=block')
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
    res.setHeader('Content-Security-Policy', "default-src 'self'")
    next()
  })

  // Enable global validation with strict security settings
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payloads to DTO instances
      whitelist: true, // Strip properties that don't have decorators
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
      transformOptions: {
        enableImplicitConversion: true, // Convert string numbers to actual numbers
      },
      forbidUnknownValues: true, // Disallow unknown objects
      disableErrorMessages: process.env.NODE_ENV === 'production', // Hide detailed errors in production
    }),
  )

  // Enable CORS with more restrictive settings
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
    'http://localhost:5173',
    'http://localhost:5174', // Added for Vite dev server
    'http://localhost:3000',
    'http://localhost:4173',
    process.env.PRODUCTION_DOMAIN || 'https://hsr-team-builder.gilded.dev',
  ]

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, etc.)
      if (!origin) {return callback(null, true)}

      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'), false)
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    maxAge: 86400, // Cache preflight response for 24 hours
  })

  // Setup Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('HSR Team Builder API')
    .setDescription('API for Honkai Star Rail Team Builder application')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  const port = process.env.PORT || 3001
  await app.listen(port)
  console.log(`🚀 Backend server running on port ${port}`)
  console.log(`📚 API Documentation available at /swagger`)
}
bootstrap()
