import { IsArray, IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Transform, Type } from 'class-transformer'

export class CreateVersionDto {
  @IsString()
  @IsNotEmpty()
  version: string

  @IsString()
  @IsNotEmpty()
  title: string

  @IsOptional()
  @IsString()
  description?: string

  @IsDateString()
  releaseDate: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  bugFixes?: string[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  breakingChanges?: string[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  knownIssues?: string[]

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isActive?: boolean

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isPrerelease?: boolean
}

export class UpdateVersionDto {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsDateString()
  releaseDate?: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  bugFixes?: string[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  breakingChanges?: string[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  knownIssues?: string[]

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isActive?: boolean

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isPrerelease?: boolean
}

export class ChangelogQueryDto {
  @IsOptional()
  @IsString()
  limit?: string = '5'

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  includePrerelease?: boolean = false
}