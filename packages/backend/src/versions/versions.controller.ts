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
  Query,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { VersionsService } from './versions.service'
import { ChangelogQueryDto, CreateVersionDto, UpdateVersionDto } from '../dto/version.dto'

@ApiTags('versions')
@Controller('versions')
export class VersionsController {
  constructor(private readonly versionsService: VersionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('seed')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Seed database with initial version data (requires authentication)' })
  @ApiResponse({ status: 201, description: 'Database seeded successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async seedDatabase(): Promise<{ message: string; count: number }> {
    return this.versionsService.seedVersions()
  }

  @UseGuards(JwtAuthGuard)
  @Delete('clear')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Clear all versions from database (requires authentication)' })
  @ApiResponse({ status: 200, description: 'Database cleared successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async clearDatabase(): Promise<{ message: string; cleared: number }> {
    return await this.versionsService.clearVersions()
  }

  @Get()
  @ApiOperation({ summary: 'Get all versions' })
  @ApiResponse({ status: 200, description: 'List of versions' })
  async findAll() {
    return this.versionsService.findAll()
  }

  @Get('latest')
  @ApiOperation({ summary: 'Get the latest stable version' })
  @ApiResponse({ status: 200, description: 'Latest version details' })
  @ApiResponse({ status: 404, description: 'No versions available' })
  async getLatest() {
    const latestVersion = await this.versionsService.getLatestVersion()
    
    if (!latestVersion) {
      return {
        message: 'No versions available',
        fallback: true,
      }
    }
    
    return latestVersion
  }

  @Get('changelog')
  @ApiOperation({ summary: 'Get recent versions for changelog' })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of versions to return (max 20)', example: '5' })
  @ApiQuery({ name: 'includePrerelease', required: false, description: 'Include prerelease versions', example: 'false' })
  @ApiResponse({ status: 200, description: 'Changelog entries' })
  async getChangelog(@Query() query: ChangelogQueryDto) {
    return this.versionsService.getChangelog(query)
  }

  @Get(':version')
  @ApiOperation({ summary: 'Get version by version string' })
  @ApiParam({ name: 'version', description: 'Version string (e.g., v2.6.2)' })
  @ApiResponse({ status: 200, description: 'Version details' })
  @ApiResponse({ status: 404, description: 'Version not found' })
  async findOne(@Param('version') version: string) {
    try {
      return await this.versionsService.findOne(version)
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        return { message: `Version ${version} not found` }
      }
      throw error
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new version (requires authentication)' })
  @ApiBody({
    description: 'Version data',
    type: CreateVersionDto,
  })
  @ApiResponse({ status: 201, description: 'Version created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Version already exists' })
  async create(@Body() createVersionDto: CreateVersionDto) {
    try {
      return await this.versionsService.create(createVersionDto)
    } catch (error) {
      if (error instanceof Error && error.message.includes('already exists')) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
      }
      throw error
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':version')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update version by version string (requires authentication)' })
  @ApiParam({ name: 'version', description: 'Version string (e.g., v2.6.2)' })
  @ApiBody({
    description: 'Version update data',
    type: UpdateVersionDto,
  })
  @ApiResponse({ status: 200, description: 'Version updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Version not found' })
  async update(@Param('version') version: string, @Body() updateVersionDto: UpdateVersionDto) {
    try {
      return await this.versionsService.update(version, updateVersionDto)
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        throw new HttpException(`Version ${version} not found`, HttpStatus.NOT_FOUND)
      }
      throw error
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':version')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete version by version string (requires authentication)' })
  @ApiParam({ name: 'version', description: 'Version string (e.g., v2.6.2)' })
  @ApiResponse({ status: 200, description: 'Version deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Version not found' })
  async remove(@Param('version') version: string): Promise<{ message: string }> {
    try {
      await this.versionsService.remove(version)
      return { message: 'Version deleted successfully' }
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        throw new HttpException(`Version ${version} not found`, HttpStatus.NOT_FOUND)
      }
      throw error
    }
  }
}