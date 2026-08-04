import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockPrismaService = {
    user: {
      upsert: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('syncUser', () => {
    it('should upsert user with correct data', async () => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User',
        image: 'http://example.com/image.jpg',
        githubId: '12345',
      };

      const expectedResult = { id: 1, ...userData };
      mockPrismaService.user.upsert.mockResolvedValue(expectedResult);

      const result = await service.syncUser(userData);

      expect(mockPrismaService.user.upsert).toHaveBeenCalledWith({
        where: { email: userData.email },
        update: {
          name: userData.name,
          image: userData.image,
          githubId: userData.githubId,
        },
        create: {
          email: userData.email,
          name: userData.name,
          image: userData.image,
          githubId: userData.githubId,
        },
      });
      expect(result).toEqual(expectedResult);
    });
  });
});
