import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity('versions')
export class VersionEntity {
  @ApiProperty({
    description: 'Version identifier',
    example: 'v2.7.0'
  })
  @PrimaryColumn()
  version: string

  @ApiProperty({
    description: 'Version title',
    example: 'Major Feature Release'
  })
  @Column()
  title: string

  @ApiProperty({
    description: 'Version description',
    example: 'This release introduces the new version management API system.',
    required: false
  })
  @Column({ type: 'text', nullable: true })
  description?: string

  @ApiProperty({
    description: 'Release date',
    example: '2025-11-02'
  })
  @Column({ type: 'date' })
  releaseDate: string

  @ApiProperty({
    description: 'List of new features',
    type: [String],
    example: ['Dynamic version info API', 'Redis caching']
  })
  @Column({ type: 'json', default: [] })
  features: string[]

  @ApiProperty({
    description: 'List of bug fixes',
    type: [String],
    example: ['Fixed memory leak', 'Resolved API timeout issues']
  })
  @Column({ type: 'json', default: [] })
  bugFixes: string[]

  @ApiProperty({
    description: 'List of breaking changes',
    type: [String],
    example: ['Changed API endpoint structure']
  })
  @Column({ type: 'json', default: [] })
  breakingChanges: string[]

  @ApiProperty({
    description: 'List of known issues',
    type: [String],
    example: ['Minor styling issue on mobile']
  })
  @Column({ type: 'json', default: [] })
  knownIssues: string[]

  @ApiProperty({
    description: 'Whether the version is active',
    example: true
  })
  @Column({ default: true })
  isActive: boolean

  @ApiProperty({
    description: 'Whether the version is a prerelease',
    example: false
  })
  @Column({ default: false })
  isPrerelease: boolean

  @ApiProperty({
    description: 'Creation timestamp'
  })
  @CreateDateColumn()
  createdAt: Date

  @ApiProperty({
    description: 'Last update timestamp'
  })
  @UpdateDateColumn()
  updatedAt: Date
}