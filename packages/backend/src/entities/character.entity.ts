import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('characters')
export class CharacterEntity {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  element: string

  @Column()
  path: string

  @Column()
  rarity: number

  @Column('text', { array: true })
  roles: string[]

  @Column('text', { array: true })
  archetype: string[]

  @Column('text', { array: true })
  labels: string[]

  @Column('jsonb', { nullable: true })
  teammateRecommendations: any[]

  @Column('jsonb', { nullable: true })
  teamCompositions: any[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date
}
