export class CharacterLightconeNoteDto {
  @ApiProperty({ description: 'Lightcone ID' })
  @IsString()
  id: string;

  @ApiPropertyOptional({ description: 'Note for this lightcone/character association' })
  @IsOptional()
  @IsString()
  note?: string;
}
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'

// Enums for validation
export enum Element {
  PHYSICAL = 'Physical',
  FIRE = 'Fire',
  ICE = 'Ice',
  LIGHTNING = 'Lightning',
  WIND = 'Wind',
  QUANTUM = 'Quantum',
  IMAGINARY = 'Imaginary',
}

export enum Path {
  DESTRUCTION = 'Destruction',
  HUNT = 'Hunt',
  ERUDITION = 'Erudition',
  HARMONY = 'Harmony',
  NIHILITY = 'Nihility',
  PRESERVATION = 'Preservation',
  ABUNDANCE = 'Abundance',
  REMEMBRANCE = 'Remembrance',
}

export enum Role {
  DPS = 'DPS',
  SUB_DPS = 'SUB_DPS',
  SUPPORT = 'SUPPORT',
  SUSTAIN = 'SUSTAIN',
}

export class TeammateRecommendationDto {
  @ApiProperty({ description: 'Section name (e.g., "Amplifiers", "Sustain")' })
  @IsString()
  name: string

  @ApiProperty({ description: 'Best in slot character IDs' })
  @IsArray()
  @IsString({ each: true })
  bis: string[]

  @ApiPropertyOptional({ description: 'Generalist character IDs' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  generalist?: string[]

  @ApiPropertyOptional({ description: 'F2P character IDs' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  f2p?: string[]
}

export class TeamVariantDto {
  @ApiProperty({ description: 'Team character IDs' })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  characters: string[]

  @ApiPropertyOptional({ description: 'Team description' })
  @IsOptional()
  @IsString()
  description?: string
}

export class TeamCompositionDto {
  @ApiProperty({ description: 'Team composition name' })
  @IsString()
  name: string

  @ApiProperty({ description: 'Character role in this team' })
  @IsString()
  role: string

  @ApiProperty({ description: 'Best in slot team variant' })
  @ValidateNested()
  @Type(() => TeamVariantDto)
  bis: TeamVariantDto

  @ApiPropertyOptional({ description: 'F2P team variant' })
  @IsOptional()
  @ValidateNested()
  @Type(() => TeamVariantDto)
  f2p?: TeamVariantDto
}

export class CreateCharacterDto {
    @ApiPropertyOptional({
      description: 'Lightcones with optional notes for this character',
      type: [CharacterLightconeNoteDto],
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CharacterLightconeNoteDto)
    lightcones?: CharacterLightconeNoteDto[];
  @ApiProperty({ description: 'Unique character identifier' })
  @IsString()
  id: string

  @ApiProperty({ description: 'Character display name' })
  @IsString()
  name: string

  @ApiProperty({ description: 'Character element', enum: Element })
  @IsEnum(Element)
  element: Element

  @ApiProperty({ description: 'Character path', enum: Path })
  @IsEnum(Path)
  path: Path

  @ApiProperty({ description: 'Character rarity (4 or 5 stars)', minimum: 4, maximum: 5 })
  @IsNumber()
  @Min(4)
  @Max(5)
  rarity: number

  @ApiProperty({ description: 'Character roles', enum: Role, isArray: true })
  @IsArray()
  @IsEnum(Role, { each: true })
  roles: Role[]

  @ApiProperty({ description: 'Character archetypes' })
  @IsArray()
  @IsString({ each: true })
  archetype: string[]

  @ApiProperty({ description: 'Character descriptive labels' })
  @IsArray()
  @IsString({ each: true })
  labels: string[]

  @ApiPropertyOptional({
    description: 'Teammate recommendations',
    type: [TeammateRecommendationDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TeammateRecommendationDto)
  teammateRecommendations?: TeammateRecommendationDto[]

  @ApiPropertyOptional({ description: 'Team compositions', type: [TeamCompositionDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TeamCompositionDto)
  teamCompositions?: TeamCompositionDto[]
}

export class UpdateCharacterDto {
  @ApiPropertyOptional({ description: 'Character display name' })
  @IsOptional()
  @IsString()
  name?: string

  @ApiPropertyOptional({ description: 'Character element', enum: Element })
  @IsOptional()
  @IsEnum(Element)
  element?: Element

  @ApiPropertyOptional({ description: 'Character path', enum: Path })
  @IsOptional()
  @IsEnum(Path)
  path?: Path

  @ApiPropertyOptional({ description: 'Character rarity (4 or 5 stars)', minimum: 4, maximum: 5 })
  @IsOptional()
  @IsNumber()
  @Min(4)
  @Max(5)
  rarity?: number

  @ApiPropertyOptional({ description: 'Character roles', enum: Role, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(Role, { each: true })
  roles?: Role[]

  @ApiPropertyOptional({ description: 'Character archetypes' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  archetype?: string[]

  @ApiPropertyOptional({ description: 'Character descriptive labels' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  labels?: string[]

  @ApiPropertyOptional({
    description: 'Teammate recommendations',
    type: [TeammateRecommendationDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TeammateRecommendationDto)
  teammateRecommendations?: TeammateRecommendationDto[]

  @ApiPropertyOptional({ description: 'Team compositions', type: [TeamCompositionDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TeamCompositionDto)
  teamCompositions?: TeamCompositionDto[]

  @ApiPropertyOptional({
    description: 'Lightcones with optional notes for this character',
    type: [CharacterLightconeNoteDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CharacterLightconeNoteDto)
  lightcones?: CharacterLightconeNoteDto[];
}
