import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { LightconesService } from './lightcones.service'
import { Lightcone } from '../types/Lightcone'
import { CreateLightconeDto, UpdateLightconeDto } from '../dto/lightcone.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@ApiTags('lightcones')
@Controller('lightcones')
export class LightconesController {
  constructor(private readonly lightconesService: LightconesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all lightcones',
    description: 'Retrieve a list of all available lightcones',
  })
  @ApiResponse({
    status: 200,
    description: 'List of lightcones retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'in-the-name-of-the-world' },
          name: { type: 'string', example: 'In the Name of the World' },
          rarity: { type: 'number', example: 5 },
          path: { type: 'string', example: 'Nihility' },
        },
      },
    },
  })
  findAll(): Promise<Lightcone[]> {
    return this.lightconesService.findAll()
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get lightcone by ID',
    description: 'Retrieve detailed information about a specific lightcone',
  })
  @ApiParam({
    name: 'id',
    description: 'Lightcone unique identifier',
    example: 'in-the-name-of-the-world',
  })
  @ApiResponse({
    status: 200,
    description: 'Lightcone details retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'in-the-name-of-the-world' },
        name: { type: 'string', example: 'In the Name of the World' },
        rarity: { type: 'number', example: 5 },
        path: { type: 'string', example: 'Nihility' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Lightcone not found',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Lightcone not found' },
      },
    },
  })
  async findOne(@Param('id') id: string): Promise<Lightcone | { message: string }> {
    const lightcone = await this.lightconesService.findById(id)
    if (!lightcone) {
      return { message: 'Lightcone not found' }
    }
    return lightcone
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new lightcone',
    description: 'Create a new lightcone (requires authentication)',
  })
  @ApiBody({
    description: 'Lightcone creation data',
    type: CreateLightconeDto,
    examples: {
      example1: {
        summary: 'Five-star Nihility lightcone',
        value: {
          id: 'in-the-name-of-the-world',
          name: 'In the Name of the World',
          rarity: 5,
          path: 'Nihility',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Lightcone created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'in-the-name-of-the-world' },
        name: { type: 'string', example: 'In the Name of the World' },
        rarity: { type: 'number', example: 5 },
        path: { type: 'string', example: 'Nihility' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Lightcone with this ID already exists' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token required' })
  async createLightcone(@Body() lightconeData: CreateLightconeDto): Promise<Lightcone> {
    try {
      // Convert DTO to Lightcone type
      const lightcone = lightconeData as Lightcone
      return await this.lightconesService.createLightcone(lightcone)
    } catch (error) {
      if (error instanceof Error && error.message.includes('already exists')) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
      }
      throw error
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update lightcone by ID',
    description: 'Update an existing lightcone (requires authentication)',
  })
  @ApiParam({
    name: 'id',
    description: 'Lightcone unique identifier',
    example: 'in-the-name-of-the-world',
  })
  @ApiBody({
    description: 'Lightcone update data (partial)',
    type: UpdateLightconeDto,
    examples: {
      example1: {
        summary: 'Update lightcone name',
        value: {
          name: 'In the Name of the World (Updated)',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Lightcone updated successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'in-the-name-of-the-world' },
        name: { type: 'string', example: 'In the Name of the World (Updated)' },
        rarity: { type: 'number', example: 5 },
        path: { type: 'string', example: 'Nihility' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token required' })
  @ApiResponse({ status: 404, description: 'Lightcone not found' })
  async updateLightcone(
    @Param('id') id: string,
    @Body() updateData: UpdateLightconeDto,
  ): Promise<Lightcone | { message: string }> {
    // Convert DTO to Partial<Lightcone> type
    const lightconeUpdate = updateData as Partial<Lightcone>
    const updatedLightcone = await this.lightconesService.updateLightcone(id, lightconeUpdate)
    if (!updatedLightcone) {
      throw new HttpException('Lightcone not found', HttpStatus.NOT_FOUND)
    }
    return updatedLightcone
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete lightcone by ID',
    description: 'Delete an existing lightcone (requires authentication)',
  })
  @ApiParam({
    name: 'id',
    description: 'Lightcone unique identifier',
    example: 'in-the-name-of-the-world',
  })
  @ApiResponse({
    status: 200,
    description: 'Lightcone deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Lightcone deleted successfully' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token required' })
  @ApiResponse({ status: 404, description: 'Lightcone not found' })
  async deleteLightcone(@Param('id') id: string): Promise<{ message: string }> {
    const deleted = await this.lightconesService.deleteLightcone(id)
    if (!deleted) {
      throw new HttpException('Lightcone not found', HttpStatus.NOT_FOUND)
    }
    return { message: 'Lightcone deleted successfully' }
  }
}
