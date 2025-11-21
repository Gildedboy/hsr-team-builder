import { Column, Entity, ManyToMany, PrimaryColumn, OneToMany } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { CharacterEntity } from './character.entity'
import { CharacterLightconeEntity } from './character-lightcone.entity'

@Entity('lightcones')
export class LightconeEntity {
  @ApiProperty({ description: 'Lightcone unique identifier', example: 'in-the-name-of-the-world' })
  @PrimaryColumn()
  id: string

  @ApiProperty({ description: 'Lightcone display name', example: 'In the Name of the World' })
  @Column()
  name: string

  @ApiProperty({ description: 'Lightcone rarity (3, 4 or 5 stars)', example: 5 })
  @Column()
  rarity: number

  @ApiProperty({ description: 'Lightcone path', example: 'Nihility' })
  @Column()
  path: string

  @ApiProperty({
    description: 'Characters that can use this lightcone',
    type: () => [CharacterEntity],
  })
  @OneToMany(() => CharacterLightconeEntity, cl => cl.lightcone)
  characterLightcones: CharacterLightconeEntity[]

  @ApiProperty({ description: 'Creation timestamp' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @ApiProperty({ description: 'Last update timestamp' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date
}
