import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sync')
  async syncUser(
    @Body()
    body: {
      email: string;
      name?: string;
      image?: string;
      githubId?: string;
    },
  ) {
    if (!body.email) {
      return { error: 'Email is required' };
    }
    return this.usersService.syncUser(body);
  }
}
