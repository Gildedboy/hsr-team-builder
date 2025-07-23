import {
  Controller,
  Get,
  Param,
  Query,
  Put,
  Post,
  Delete,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger'
import { CharactersService } from './characters.service'
import { Character } from '../types/Character'
import { CreateCharacterDto, UpdateCharacterDto } from '../dto/character.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

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
  async seedDatabase(): Promise<{ message: string; count: number }> {
    return await this.charactersService.seedCharacters()
  }

  @UseGuards(JwtAuthGuard)
  @Delete('clear')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Clear all characters from database (requires authentication)' })
  @ApiResponse({ status: 200, description: 'Database cleared successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async clearDatabase(): Promise<{ message: string; cleared: number }> {
    return await this.charactersService.clearCharacters()
  }

  @Get()
  @ApiOperation({ summary: 'Get all characters' })
  @ApiQuery({ name: 'role', required: false, description: 'Filter by role' })
  @ApiQuery({ name: 'element', required: false, description: 'Filter by element' })
  @ApiQuery({ name: 'path', required: false, description: 'Filter by path' })
  @ApiQuery({ name: 'search', required: false, description: 'Search characters by name or labels' })
  @ApiResponse({ status: 200, description: 'List of characters' })
  async findAll(
    @Query('role') role?: string,
    @Query('element') element?: string,
    @Query('path') path?: string,
    @Query('search') search?: string,
  ): Promise<Character[]> {
    let characters = await this.charactersService.findAll()

    if (role) {
      characters = characters.filter((char) => char.roles.includes(role as any))
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
  @ApiOperation({ summary: 'Get character by ID' })
  @ApiParam({ name: 'id', description: 'Character ID' })
  @ApiResponse({ status: 200, description: 'Character details' })
  @ApiResponse({ status: 404, description: 'Character not found' })
  async findOne(@Param('id') id: string): Promise<Character | { message: string }> {
    const character = await this.charactersService.findById(id)
    if (!character) {
      return { message: 'Character not found' }
    }
    return character
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
    // Convert DTO to Partial<Character> type
    const characterUpdate = updateData as Partial<Character>
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
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createCharacter(@Body() characterData: CreateCharacterDto): Promise<Character> {
    // Convert DTO to Character type
    const character = characterData as Character
    return await this.charactersService.createCharacter(character)
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
