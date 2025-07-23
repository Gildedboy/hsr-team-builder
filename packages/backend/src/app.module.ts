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
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'hsr_team_builder',
      entities: [CharacterEntity],
      synchronize: true, // Set to false in production
      logging: true, // Enable SQL logging for development
    }),
    CacheModule.register({
      // @ts-ignore
      store: redisStore,
      host: 'localhost',
      port: 6379,
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
