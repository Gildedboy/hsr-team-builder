import { IsEnum, IsOptional, IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

// Enum for lightcone rarity validation
export enum LightconeRarity {
  THREE_STAR = 3,
  FOUR_STAR = 4,
  FIVE_STAR = 5,
}

export enum LightconePath {
  DESTRUCTION = 'Destruction',
  HUNT = 'Hunt',
  ERUDITION = 'Erudition',
  HARMONY = 'Harmony',
  NIHILITY = 'Nihility',
  PRESERVATION = 'Preservation',
  ABUNDANCE = 'Abundance',
  REMEMBRANCE = 'Remembrance',
}

export class CreateLightconeDto {
  @ApiProperty({
    description: 'Unique lightcone identifier',
    example: 'in-the-name-of-the-world',
  })
  @IsString()
  id: string

  @ApiProperty({
    description: 'Lightcone display name',
    example: 'In the Name of the World',
  })
  @IsString()
  name: string

  @ApiProperty({
    description: 'Lightcone rarity (3, 4 or 5 stars)',
    enum: LightconeRarity,
    example: LightconeRarity.FIVE_STAR,
  })
  @IsEnum(LightconeRarity)
  rarity: LightconeRarity

  @ApiProperty({
    description: 'Lightcone path',
    enum: LightconePath,
    example: LightconePath.NIHILITY,
  })
  @IsEnum(LightconePath)
  path: LightconePath
}

export class UpdateLightconeDto {
  @ApiPropertyOptional({
    description: 'Lightcone display name',
    example: 'In the Name of the World',
  })
  @IsOptional()
  @IsString()
  name?: string

  @ApiPropertyOptional({
    description: 'Lightcone rarity (3, 4 or 5 stars)',
    enum: LightconeRarity,
    example: LightconeRarity.FIVE_STAR,
  })
  @IsOptional()
  @IsEnum(LightconeRarity)
  rarity?: LightconeRarity

  @ApiPropertyOptional({
    description: 'Lightcone path',
    enum: LightconePath,
    example: LightconePath.NIHILITY,
  })
  @IsOptional()
  @IsEnum(LightconePath)
  path?: LightconePath
}
