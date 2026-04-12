import { Module } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import KeyvRedis from '@keyv/redis'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { CharactersModule } from './characters/characters.module'
import { TeamsModule } from './teams/teams.module'
import { AuthModule } from './auth/auth.module'
import { VersionsModule } from './versions/versions.module'
import { LightconesModule } from './lightcones/lightcones.module'
import { CharacterEntity } from './entities/character.entity'
import { VersionEntity } from './entities/version.entity'
import { LightconeEntity } from './entities/lightcone.entity'
import { CharacterLightconeEntity } from './entities/character-lightcone.entity'
import { getDatabaseUrl, getRedisUrl } from './config/env'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: getDatabaseUrl(),
      entities: [CharacterEntity, VersionEntity, LightconeEntity, CharacterLightconeEntity],
      synchronize: true, // Enable for initial schema creation
      logging: process.env.NODE_ENV === 'development',
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000, // 1 second
        limit: 10, // 10 requests per second
      },
      {
        name: 'medium',
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute
      },
      {
        name: 'long',
        ttl: 900000, // 15 minutes
        limit: 1000, // 1000 requests per 15 minutes
      },
    ]),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        // Nest 11 cache-manager integrations are Keyv-based.
        stores: [new KeyvRedis(getRedisUrl())],
        ttl: 5 * 60 * 1000,
      }),
    }),
    CharactersModule,
    TeamsModule,
    AuthModule,
    VersionsModule,
    LightconesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
