import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { CharacterLightconeEntity } from './character-lightcone.entity'

@Entity('characters')
export class CharacterEntity {
  @ApiProperty({ description: 'Character unique identifier', example: 'seele' })
  @PrimaryColumn()
  id: string

  @ApiProperty({ description: 'Character display name', example: 'Seele' })
  @Column()
  name: string

  @ApiProperty({ description: 'Character element', example: 'Quantum' })
  @Column()
  element: string

  @ApiProperty({ description: 'Character path', example: 'Hunt' })
  @Column()
  path: string

  @ApiProperty({ description: 'Character rarity (4 or 5 stars)', example: 5 })
  @Column()
  rarity: number

  @ApiProperty({ description: 'Optional Prydwen link for character builds', required: false })
  @Column({ nullable: true })
  prydwenLink?: string | null

  @ApiProperty({ description: 'Optional Guoba video link', required: false })
  @Column({ nullable: true })
  guobaLink?: string | null

  @ApiProperty({ description: 'Character roles', type: [String], example: ['DPS'] })
  @Column('text', { array: true })
  roles: string[]

  @ApiProperty({ description: 'Character archetypes', type: [String], example: ['Hypercarry'] })
  @Column('text', { array: true })
  archetype: string[]

  @ApiProperty({
    description: 'Character descriptive labels',
    type: [String],
    example: ['Single Target', 'Extra Turn'],
  })
  @Column('text', { array: true })
  labels: string[]

  @ApiProperty({ description: 'Teammate recommendations', required: false })
  @Column('jsonb', { nullable: true })
  teammateRecommendations: any[]

  @ApiProperty({ description: 'Team compositions', required: false })
  @Column('jsonb', { nullable: true })
  teamCompositions: any[]

  @ApiProperty({
    description: 'Character lightcones with optional notes',
    type: () => [CharacterLightconeEntity],
    required: false,
  })
  @OneToMany(() => CharacterLightconeEntity, (relation) => relation.character, { cascade: true })
  lightconeRelations: CharacterLightconeEntity[]

  @ApiProperty({ description: 'Creation timestamp' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @ApiProperty({ description: 'Last update timestamp' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date
}
