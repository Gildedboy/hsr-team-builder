import { Module } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import { TypeOrmModule } from '@nestjs/typeorm'
import { redisStore } from 'cache-manager-redis-store'
import { CharactersModule } from './characters/characters.module'
import { TeamsModule } from './teams/teams.module'
import { CharacterEntity } from './entities/character.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/hsr_team_builder',
      entities: [CharacterEntity],
      synchronize: process.env.NODE_ENV !== 'production', // Only sync in development
      logging: process.env.NODE_ENV === 'development',
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    }),
    CacheModule.register({
      // @ts-ignore
      store: redisStore,
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      ttl: 300, // 5 minutes cache
      max: 100, // maximum number of items in cache
      isGlobal: true, // Make cache available globally
    }),
    CharactersModule,
    TeamsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
