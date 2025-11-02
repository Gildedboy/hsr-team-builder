import { NestFactory } from '@nestjs/core'
import { AppModule } from '../app.module'
import { VersionsService } from '../versions/versions.service'

async function seedVersions() {
  const app = await NestFactory.createApplicationContext(AppModule)
  const versionsService = app.get(VersionsService)

  try {
    const result = await versionsService.seedVersions()
    console.log('✅', result.message)
  } catch (error) {
    console.error('❌ Error seeding versions:', error)
  } finally {
    await app.close()
  }
}

seedVersions().catch(console.error)