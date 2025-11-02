import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity('versions')
export class VersionEntity {
  @PrimaryColumn()
  version: string

  @Column()
  title: string

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ type: 'date' })
  releaseDate: string

  @Column({ type: 'json', default: [] })
  features: string[]

  @Column({ type: 'json', default: [] })
  bugFixes: string[]

  @Column({ type: 'json', default: [] })
  breakingChanges: string[]

  @Column({ type: 'json', default: [] })
  knownIssues: string[]

  @Column({ default: true })
  isActive: boolean

  @Column({ default: false })
  isPrerelease: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}