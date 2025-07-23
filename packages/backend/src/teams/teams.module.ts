import { Module } from '@nestjs/common'
import { TeamsController } from './teams.controller'
import { TeamsService } from './teams.service'
import { CharactersModule } from '../characters/characters.module'

@Module({
  imports: [CharactersModule],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
