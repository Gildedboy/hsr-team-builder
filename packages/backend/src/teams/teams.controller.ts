import { Controller, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { TeamRecommendation, TeamsService } from './teams.service'

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get('popular')
  @ApiOperation({ summary: 'Get popular team compositions' })
  @ApiResponse({ status: 200, description: 'List of popular teams' })
  async getPopularTeams(): Promise<TeamRecommendation[]> {
    return this.teamsService.getPopularTeams()
  }

  @Get('recommendations/:characterId')
  @ApiOperation({ summary: 'Get team recommendations for a character' })
  @ApiParam({ name: 'characterId', description: 'Character ID to build teams around' })
  @ApiResponse({ status: 200, description: 'Team recommendations for the character' })
  async getTeamRecommendations(
    @Param('characterId') characterId: string,
  ): Promise<TeamRecommendation[]> {
    return this.teamsService.generateTeamRecommendations(characterId)
  }
}
