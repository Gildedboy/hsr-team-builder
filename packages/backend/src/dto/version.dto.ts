import { IsArray, IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Transform, Type } from 'class-transformer'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateVersionDto {
  @ApiProperty({
    description: 'Version identifier (e.g., v2.7.0)',
    example: 'v2.7.0'
  })
  @IsString()
  @IsNotEmpty()
  version: string

  @ApiProperty({
    description: 'Version title or name',
    example: 'Major Feature Release'
  })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiPropertyOptional({
    description: 'Detailed description of the version',
    example: 'This release introduces the new version management API system.'
  })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({
    description: 'Release date in ISO format',
    example: '2025-11-02'
  })
  @IsDateString()
  releaseDate: string

  @ApiPropertyOptional({
    description: 'List of new features',
    type: [String],
    example: ['Dynamic version info API', 'Redis caching', 'JWT authentication']
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[]

  @ApiPropertyOptional({
    description: 'List of bug fixes',
    type: [String],
    example: ['Fixed memory leak', 'Resolved API timeout issues']
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  bugFixes?: string[]

  @ApiPropertyOptional({
    description: 'List of breaking changes',
    type: [String],
    example: ['Changed API endpoint structure', 'Updated authentication method']
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  breakingChanges?: string[]

  @ApiPropertyOptional({
    description: 'List of known issues',
    type: [String],
    example: ['Minor styling issue on mobile', 'Slow loading on older browsers']
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  knownIssues?: string[]

  @ApiPropertyOptional({
    description: 'Whether the version is active',
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isActive?: boolean

  @ApiPropertyOptional({
    description: 'Whether the version is a prerelease',
    example: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isPrerelease?: boolean
}

export class UpdateVersionDto {
  @ApiPropertyOptional({
    description: 'Version title or name',
    example: 'Updated Major Feature Release'
  })
  @IsOptional()
  @IsString()
  title?: string

  @ApiPropertyOptional({
    description: 'Detailed description of the version',
    example: 'Updated description with additional improvements.'
  })
  @IsOptional()
  @IsString()
  description?: string

  @ApiPropertyOptional({
    description: 'Release date in ISO format',
    example: '2025-11-02'
  })
  @IsOptional()
  @IsDateString()
  releaseDate?: string

  @ApiPropertyOptional({
    description: 'List of new features',
    type: [String],
    example: ['Enhanced API performance', 'New caching system']
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[]

  @ApiPropertyOptional({
    description: 'List of bug fixes',
    type: [String],
    example: ['Fixed critical security issue', 'Resolved database connection problems']
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  bugFixes?: string[]

  @ApiPropertyOptional({
    description: 'List of breaking changes',
    type: [String],
    example: ['Removed deprecated endpoints', 'Changed response format']
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  breakingChanges?: string[]

  @ApiPropertyOptional({
    description: 'List of known issues',
    type: [String],
    example: ['Performance degradation on large datasets']
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  knownIssues?: string[]

  @ApiPropertyOptional({
    description: 'Whether the version is active',
    example: true
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isActive?: boolean

  @ApiPropertyOptional({
    description: 'Whether the version is a prerelease',
    example: false
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isPrerelease?: boolean
}

export class ChangelogQueryDto {
  @ApiPropertyOptional({
    description: 'Maximum number of versions to return (1-20)',
    example: '5',
    default: '5'
  })
  @IsOptional()
  @IsString()
  limit?: string = '5'

  @ApiPropertyOptional({
    description: 'Whether to include prerelease versions',
    example: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  includePrerelease?: boolean = false
}