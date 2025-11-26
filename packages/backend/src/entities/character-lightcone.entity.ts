import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { CharacterEntity } from './character.entity'
import { LightconeEntity } from './lightcone.entity'

@Entity('character_lightcones')
@Unique(['characterId', 'lightconeId'])
export class CharacterLightconeEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: 'Character ID', example: 'himeko' })
  @Column({ name: 'character_id' })
  characterId: string

  @ApiProperty({ description: 'Lightcone ID', example: '20000' })
  @Column({ name: 'lightcone_id' })
  lightconeId: string

  @ApiProperty({
    description: 'Optional note/label for this lightcone on the specific character',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  note?: string | null

  @ManyToOne(() => CharacterEntity, (character) => character.lightconeRelations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'character_id' })
  character: CharacterEntity

  @ManyToOne(() => LightconeEntity, (lightcone) => lightcone.characterRelations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lightcone_id' })
  lightcone: LightconeEntity
}
