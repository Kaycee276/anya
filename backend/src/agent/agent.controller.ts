import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AgentService } from './agent.service';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post('webhook')
  async handleWebhook(@Body() payload: any) {
    return this.agentService.handleWebhook(payload);
  }

  @Get('status/:repoOwner/:repoName')
  async getStatus(
    @Param('repoOwner') repoOwner: string,
    @Param('repoName') repoName: string,
  ) {
    return this.agentService.getStatus(`${repoOwner}/${repoName}`);
  }
}
