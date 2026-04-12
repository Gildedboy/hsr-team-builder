import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger'
import { CharactersService } from './characters.service'
import { Character, Role } from '../types/Character'
import {
  BulkCharacterUpdateDto,
  BulkCharacterUpdateResponseDto,
  CreateCharacterDto,
  UpdateCharacterDto,
} from '../dto/character.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

const ROLE_VALUES: Role[] = ['DPS', 'SUB_DPS', 'SUPPORT', 'SUSTAIN', 'AMPLIFIER']
const isRole = (value: string): value is Role => ROLE_VALUES.includes(value as Role)

@ApiExtraModels(CreateCharacterDto, BulkCharacterUpdateResponseDto)
@ApiTags('characters')
@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('seed')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Seed database with initial character data (requires authentication)' })
  @ApiResponse({ status: 201, description: 'Database seeded successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  seedDatabase(): Promise<{ message: string; count: number }> {
    return this.charactersService.seedCharacters()
  }

  @UseGuards(JwtAuthGuard)
  @Delete('clear')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Clear all characters from database (requires authentication)' })
  @ApiResponse({ status: 200, description: 'Database cleared successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  clearDatabase(): Promise<{ message: string; cleared: number }> {
    return this.charactersService.clearCharacters()
  }

  @Get()
  @ApiOperation({
    summary: 'Get all characters',
    description: 'Retrieve all characters with optional filtering',
  })
  @ApiQuery({ name: 'role', required: false, description: 'Filter by role' })
  @ApiQuery({ name: 'element', required: false, description: 'Filter by element' })
  @ApiQuery({ name: 'path', required: false, description: 'Filter by path' })
  @ApiQuery({ name: 'search', required: false, description: 'Search characters by name or labels' })
  @ApiResponse({
    status: 200,
    description: 'List of characters with their associated lightcones',
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(CreateCharacterDto),
      },
    },
  })
  async findAll(
    @Query('role') role?: string,
    @Query('element') element?: string,
    @Query('path') path?: string,
    @Query('search') search?: string,
  ): Promise<Character[]> {
    let characters = await this.charactersService.findAll()

    if (role && isRole(role)) {
      characters = characters.filter((char) => char.roles.includes(role))
    }

    if (element) {
      characters = characters.filter((char) => char.element === element)
    }

    if (path) {
      characters = characters.filter((char) => char.path === path)
    }

    if (search) {
      const lowercaseQuery = search.toLowerCase()
      characters = characters.filter(
        (char) =>
          char.name.toLowerCase().includes(lowercaseQuery) ||
          char.labels.some((label) => label.toLowerCase().includes(lowercaseQuery)),
      )
    }

    return characters
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get character by ID',
    description: 'Retrieve detailed information about a specific character',
  })
  @ApiParam({ name: 'id', description: 'Character unique identifier', example: 'kafka' })
  @ApiResponse({
    status: 200,
    description: 'Character details with associated lightcones',
    schema: {
      $ref: getSchemaPath(CreateCharacterDto),
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Character not found',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Character not found' },
      },
    },
  })
  async findOne(@Param('id') id: string): Promise<Character> {
    const character = await this.charactersService.findById(id)
    if (!character) {
      throw new HttpException('Character not found', HttpStatus.NOT_FOUND)
    }
    return character
  }

  @UseGuards(JwtAuthGuard)
  @Patch('bulk')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Bulk update nested character recommendations and team compositions (requires authentication)',
    description:
      'Use this endpoint to update many characters at once without rewriting full character payloads. It supports two admin workflows: adding IDs into teammate recommendation buckets, and replacing a specific slot inside matched team compositions. Start with `dryRun: true` to preview the result safely in Swagger before persisting changes.',
  })
  @ApiBody({
    description: 'Bulk character operations with optional dry-run preview support',
    type: BulkCharacterUpdateDto,
    examples: {
      addCyreneToBisTeammates: {
        summary: 'Add Cyrene to the BiS amplifier list for multiple characters',
        value: {
          operations: [
            {
              type: 'upsert_teammate_recommendation',
              characterIds: ['firefly', 'feixiao', 'boothill'],
              sectionName: 'Amplifiers',
              bucket: 'bis',
              teammateIds: ['cyrene'],
              mode: 'append_unique',
            },
          ],
        },
      },
      replaceFinalBisSlot: {
        summary: 'Replace the final BiS slot in matched teams with DHPT',
        value: {
          operations: [
            {
              type: 'replace_team_member',
              characterIds: ['firefly', 'rappa', 'boothill'],
              match: {
                role: 'Main DPS',
              },
              variant: 'bis',
              slotIndex: 3,
              newCharacterId: 'dhpt',
            },
          ],
          dryRun: true,
        },
      },
      replaceSpecificSustainlessSlot: {
        summary: 'Only replace a specific existing character in matched team slots',
        value: {
          operations: [
            {
              type: 'replace_team_member',
              characterIds: ['firefly', 'boothill'],
              match: {
                nameContains: 'Sustainless',
              },
              variant: 'bis',
              slotIndex: 3,
              expectedCharacterId: 'ruan-mei',
              newCharacterId: 'dhpt',
            },
          ],
          dryRun: true,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Bulk update completed successfully',
    type: BulkCharacterUpdateResponseDto,
    examples: {
      dryRunPreview: {
        summary: 'Preview response',
        value: {
          dryRun: true,
          operations: [
            {
              index: 0,
              type: 'replace_team_member',
              requestedCharacterIds: ['firefly', 'boothill', 'rappa'],
              updatedCharacterIds: ['firefly', 'boothill'],
              skippedCharacterIds: ['rappa'],
              details: [
                'Updated firefly composition "Main DPS Team" (bis) slot 3 -> dhpt',
                'Updated boothill composition "Main DPS Team" (bis) slot 3 -> dhpt',
                'Skipped rappa: character not found',
              ],
            },
          ],
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid bulk update payload' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  bulkUpdateCharacters(@Body() bulkUpdate: BulkCharacterUpdateDto): Promise<BulkCharacterUpdateResponseDto> {
    return this.charactersService.bulkUpdateCharacters(bulkUpdate)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update character by ID (requires authentication)' })
  @ApiParam({ name: 'id', description: 'Character ID' })
  @ApiBody({
    description: 'Character update data',
    type: UpdateCharacterDto,
  })
  @ApiResponse({ status: 200, description: 'Character updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Character not found' })
  async updateCharacter(
    @Param('id') id: string,
    @Body() updateData: UpdateCharacterDto,
  ): Promise<Character | { message: string }> {
    // Convert DTO to Partial<Character> type and handle lightcone relations
    const characterUpdate = updateData as Partial<Character> & {
      lightcones?: { id: string; note?: string }[]
    }
    const updatedCharacter = await this.charactersService.updateCharacter(id, characterUpdate)
    if (!updatedCharacter) {
      throw new HttpException('Character not found', HttpStatus.NOT_FOUND)
    }
    return updatedCharacter
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new character (requires authentication)' })
  @ApiBody({
    description: 'Character data',
    type: CreateCharacterDto,
  })
  @ApiResponse({ status: 201, description: 'Character created successfully' })
  @ApiResponse({ status: 400, description: 'Character with this ID already exists' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createCharacter(@Body() characterData: CreateCharacterDto): Promise<Character> {
    try {
      // Convert DTO to Character type
      const character = characterData as Character
      return await this.charactersService.createCharacter(character)
    } catch (error) {
      if (error instanceof Error && error.message.includes('already exists')) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
      }
      throw error
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete character by ID (requires authentication)' })
  @ApiParam({ name: 'id', description: 'Character ID' })
  @ApiResponse({ status: 200, description: 'Character deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Character not found' })
  async deleteCharacter(@Param('id') id: string): Promise<{ message: string }> {
    const deleted = await this.charactersService.deleteCharacter(id)
    if (!deleted) {
      throw new HttpException('Character not found', HttpStatus.NOT_FOUND)
    }
    return { message: 'Character deleted successfully' }
  }
}
