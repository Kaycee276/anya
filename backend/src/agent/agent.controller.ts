import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AgentService } from './agent.service';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post('webhook')
  handleWebhook(@Body() payload: { repository?: { full_name?: string } }) {
    return this.agentService.handleWebhook(payload);
  }

  @Get('status/:repoOwner/:repoName')
  getStatus(
    @Param('repoOwner') repoOwner: string,
    @Param('repoName') repoName: string,
  ) {
    return this.agentService.getStatus(`${repoOwner}/${repoName}`);
  }
}
