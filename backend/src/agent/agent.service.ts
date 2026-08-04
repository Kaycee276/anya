import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AgentService {
  private readonly logger = new Logger(AgentService.name);
  private generationCount = new Map<string, number>();

  handleWebhook(payload: { repository?: { full_name?: string } }) {
    this.logger.log(
      `Received webhook for repo: ${payload.repository?.full_name}`,
    );

    // Mock generation cap logic (3/day for free tier)
    const repoName = payload.repository?.full_name || 'unknown/repo';
    const currentCount = this.generationCount.get(repoName) || 0;

    if (currentCount >= 3) {
      this.logger.warn(
        `Generation cap reached for ${repoName}. Skipping incremental update.`,
      );
      return { status: 'skipped', reason: 'generation_cap_reached' };
    }

    this.generationCount.set(repoName, currentCount + 1);

    // Mock agent logic
    this.logger.log(`Parsing frontend codebase...`);
    this.logger.log(`Computing diffs...`);
    this.logger.log(`Generating backend code and DB guardrails...`);

    return {
      status: 'success',
      diff: {
        added: ['src/users/users.module.ts', 'src/users/users.controller.ts'],
        modified: ['prisma/schema.prisma'],
        removed: [],
      },
      guardrails: [
        'Field email is required',
        'Field password is PII, encrypt at rest',
      ],
    };
  }

  getStatus(repoName: string) {
    return {
      repo: repoName,
      generationsToday: this.generationCount.get(repoName) || 0,
      limit: 3,
    };
  }
}
