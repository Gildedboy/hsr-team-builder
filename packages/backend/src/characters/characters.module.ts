import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CharactersController } from './characters.controller'
import { CharactersService } from './characters.service'
import { CharacterEntity } from '../entities/character.entity'
import { LightconeEntity } from '../entities/lightcone.entity'
import { CharacterLightconeEntity } from '../entities/character-lightcone.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CharacterEntity, LightconeEntity, CharacterLightconeEntity])],
  controllers: [CharactersController],
  providers: [CharactersService],
  exports: [CharactersService],
})
export class CharactersModule {}
