import {
  ArrayNotEmpty,
  ArrayMinSize,
  IsBoolean,
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { LightconePath, LightconeRarity } from './lightcone.dto'

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
  ELATION = 'Elation',
}

export enum Role {
  DPS = 'DPS',
  SUB_DPS = 'SUB_DPS',
  SUPPORT = 'SUPPORT',
  SUSTAIN = 'SUSTAIN',
  AMPLIFIER = 'AMPLIFIER',
}

export enum BulkCharacterOperationType {
  UPSERT_TEAMMATE_RECOMMENDATION = 'upsert_teammate_recommendation',
  REPLACE_TEAM_MEMBER = 'replace_team_member',
}

export enum RecommendationBucket {
  BIS = 'bis',
  GENERALIST = 'generalist',
  F2P = 'f2p',
}

export enum BulkListUpdateMode {
  APPEND_UNIQUE = 'append_unique',
  REPLACE = 'replace',
}

export enum TeamVariantType {
  BIS = 'bis',
  F2P = 'f2p',
}

export class TeamCompositionMatchDto {
  @ApiPropertyOptional({
    description: 'Match a team composition by exact name',
    example: 'Main DPS Team',
  })
  @IsOptional()
  @IsString()
  name?: string

  @ApiPropertyOptional({
    description: 'Match team compositions whose name contains this substring',
    example: 'Sustainless',
  })
  @IsOptional()
  @IsString()
  nameContains?: string

  @ApiPropertyOptional({
    description: 'Match a team composition by role label',
    example: 'Main DPS',
  })
  @IsOptional()
  @IsString()
  role?: string
}

export class CharacterBulkOperationDto {
  @ApiProperty({
    enum: BulkCharacterOperationType,
    description:
      'Bulk operation type. Use `upsert_teammate_recommendation` for teammate sections, or `replace_team_member` for team composition slots.',
    example: BulkCharacterOperationType.UPSERT_TEAMMATE_RECOMMENDATION,
  })
  @IsEnum(BulkCharacterOperationType)
  type: BulkCharacterOperationType

  @ApiProperty({
    description: 'Characters that should receive this operation',
    type: [String],
    example: ['firefly', 'feixiao', 'boothill'],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  characterIds: string[]

  @ApiPropertyOptional({
    description:
      'Teammate recommendation section name to update. Required for `upsert_teammate_recommendation`.',
    example: 'Amplifiers',
  })
  @IsOptional()
  @IsString()
  sectionName?: string

  @ApiPropertyOptional({
    enum: RecommendationBucket,
    description:
      'Recommendation bucket to edit inside the selected teammate section. Required for `upsert_teammate_recommendation`.',
    example: RecommendationBucket.BIS,
  })
  @IsOptional()
  @IsEnum(RecommendationBucket)
  bucket?: RecommendationBucket

  @ApiPropertyOptional({
    description:
      'Teammate IDs to add or replace in the target recommendation bucket. Required for `upsert_teammate_recommendation`.',
    type: [String],
    example: ['cyrene'],
  })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  teammateIds?: string[]

  @ApiPropertyOptional({
    description:
      'How to update the target recommendation bucket. `append_unique` keeps existing IDs and adds new ones only if missing. `replace` overwrites the full bucket.',
    enum: BulkListUpdateMode,
    default: BulkListUpdateMode.APPEND_UNIQUE,
    example: BulkListUpdateMode.APPEND_UNIQUE,
  })
  @IsOptional()
  @IsEnum(BulkListUpdateMode)
  mode?: BulkListUpdateMode

  @ApiPropertyOptional({
    description:
      'Filters that select which team compositions to update. Optional for `replace_team_member`; if omitted, all team compositions for each target character are considered.',
    type: TeamCompositionMatchDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => TeamCompositionMatchDto)
  match?: TeamCompositionMatchDto

  @ApiPropertyOptional({
    description:
      'Which variant inside the matched team composition should be edited. Required for `replace_team_member`.',
    enum: TeamVariantType,
    example: TeamVariantType.BIS,
  })
  @IsOptional()
  @IsEnum(TeamVariantType)
  variant?: TeamVariantType

  @ApiPropertyOptional({
    description:
      '0-based team slot to replace inside the selected variant. Example: `3` targets the fourth/final team slot.',
    minimum: 0,
    example: 3,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  slotIndex?: number

  @ApiPropertyOptional({
    description:
      'Optional safety check. Only replace the slot when it currently matches this character ID.',
    example: 'ruan-mei',
  })
  @IsOptional()
  @IsString()
  expectedCharacterId?: string

  @ApiPropertyOptional({
    description:
      'Character ID that will be written into the target slot. Required for `replace_team_member`.',
    example: 'dhpt',
  })
  @IsOptional()
  @IsString()
  newCharacterId?: string
}

export class BulkCharacterUpdateDto {
  @ApiProperty({
    description: 'List of bulk operations to run sequentially',
    type: [CharacterBulkOperationDto],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CharacterBulkOperationDto)
  operations: CharacterBulkOperationDto[]

  @ApiPropertyOptional({
    description:
      'Preview changes without persisting them. Useful to verify which characters and teams will be affected before applying the update.',
    default: false,
    example: true,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  dryRun?: boolean
}

export class BulkCharacterOperationResultDto {
  @ApiProperty({ description: '0-based index of the operation in the request payload', example: 0 })
  index: number

  @ApiProperty({ enum: BulkCharacterOperationType, example: BulkCharacterOperationType.REPLACE_TEAM_MEMBER })
  type: BulkCharacterOperationType

  @ApiProperty({
    description: 'Target character IDs requested for this operation',
    type: [String],
    example: ['firefly', 'boothill', 'rappa'],
  })
  requestedCharacterIds: string[]

  @ApiProperty({
    description: 'Character IDs that were actually modified',
    type: [String],
    example: ['firefly', 'boothill'],
  })
  updatedCharacterIds: string[]

  @ApiProperty({
    description: 'Character IDs that were skipped because nothing changed or the character was missing',
    type: [String],
    example: ['rappa'],
  })
  skippedCharacterIds: string[]

  @ApiProperty({
    description: 'Human-readable notes describing what happened for each target',
    type: [String],
    example: [
      'Updated firefly composition "Main DPS Team" (bis) slot 3 -> dhpt',
      'Skipped rappa: character not found',
    ],
  })
  details: string[]
}

export class BulkCharacterUpdateResponseDto {
  @ApiProperty({
    description: 'Whether the request ran in preview mode without saving changes',
    example: true,
  })
  dryRun: boolean

  @ApiProperty({
    description: 'Results for each requested bulk operation, in order',
    type: [BulkCharacterOperationResultDto],
  })
  operations: BulkCharacterOperationResultDto[]
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

export class CharacterLightconeDto {
  @ApiProperty({ description: 'Lightcone ID (required on write)', example: '23000' })
  @IsString()
  id: string

  @ApiPropertyOptional({
    description: 'Lightcone name (ignored on write; provided by GET)',
    example: 'In the Name of the World',
  })
  @IsOptional()
  @IsString()
  name?: string

  @ApiPropertyOptional({
    description: 'Lightcone rarity (ignored on write; provided by GET)',
    enum: LightconeRarity,
    example: LightconeRarity.FIVE_STAR,
  })
  @IsOptional()
  @IsEnum(LightconeRarity)
  rarity?: LightconeRarity

  @ApiPropertyOptional({
    description: 'Lightcone path (ignored on write; provided by GET)',
    enum: LightconePath,
    example: LightconePath.NIHILITY,
  })
  @IsOptional()
  @IsEnum(LightconePath)
  path?: LightconePath

  @ApiPropertyOptional({
    description: 'Per-character lightcone note/label',
    example: 'Best in slot',
  })
  @IsOptional()
  @IsString()
  note?: string
}

export class CreateCharacterDto {
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

  @ApiPropertyOptional({
    description: 'Link to Prydwen build guide for this character',
    example: 'https://www.prydwen.gg/star-rail/characters/kafka/',
  })
  @IsOptional()
  @IsString()
  prydwenLink?: string

  @ApiPropertyOptional({
    description: 'Link to Guoba video guide for this character',
    example: 'https://www.youtube.com/embed/xyz123',
  })
  @IsOptional()
  @IsString()
  guobaLink?: string

  @ApiPropertyOptional({
    description:
      'Lightcones for this character. On POST/PUT, only `id` (+ optional `note`) is used; other fields are ignored.',
    type: [CharacterLightconeDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CharacterLightconeDto)
  lightcones?: CharacterLightconeDto[]
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
    description: 'Link to Prydwen build guide for this character',
    example: 'https://www.prydwen.gg/star-rail/characters/kafka/',
  })
  @IsOptional()
  @IsString()
  prydwenLink?: string

  @ApiPropertyOptional({
    description: 'Link to Guoba video guide for this character',
    example: 'https://www.youtube.com/embed/xyz123',
  })
  @IsOptional()
  @IsString()
  guobaLink?: string

  @ApiPropertyOptional({
    description:
      'Lightcones for this character. On POST/PUT, only `id` (+ optional `note`) is used; other fields are ignored.',
    type: [CharacterLightconeDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CharacterLightconeDto)
  lightcones?: CharacterLightconeDto[]
}
