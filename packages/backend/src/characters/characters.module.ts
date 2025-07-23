import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CharactersController } from './characters.controller'
import { CharactersService } from './characters.service'
import { CharacterEntity } from '../entities/character.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CharacterEntity])],
  controllers: [CharactersController],
  providers: [CharactersService],
  exports: [CharactersService],
})
export class CharactersModule {}
