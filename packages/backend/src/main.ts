import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payloads to DTO instances
      whitelist: true, // Strip properties that don't have decorators
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
      transformOptions: {
        enableImplicitConversion: true, // Convert string numbers to actual numbers
      },
    }),
  )

  // Enable CORS for the frontend
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://hsr-team-builder.gilded.dev'] // Your custom domain
      : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })

  // Setup Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('HSR Team Builder API')
    .setDescription('API for Honkai Star Rail team building')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  const port = process.env.PORT || 3001
  await app.listen(port)
  console.log(`🚀 Backend server running on port ${port}`)
  console.log(`📚 API Documentation available at /swagger`)
}
bootstrap()
