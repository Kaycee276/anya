import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async syncUser(data: {
    email: string;
    name?: string;
    image?: string;
    githubId?: string;
  }) {
    return this.prisma.user.upsert({
      where: { email: data.email },
      update: {
        name: data.name,
        image: data.image,
        githubId: data.githubId,
      },
      create: {
        email: data.email,
        name: data.name,
        image: data.image,
        githubId: data.githubId,
      },
    });
  }
}
