import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    syncUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('syncUser', () => {
    it('should return error if email is missing', async () => {
      const result = await controller.syncUser({} as { email: string });
      expect(result).toEqual({ error: 'Email is required' });
      expect(mockUsersService.syncUser).not.toHaveBeenCalled();
    });

    it('should call usersService.syncUser with correct data', async () => {
      const userData = { email: 'test@example.com', name: 'Test User' };
      mockUsersService.syncUser.mockResolvedValue(userData);

      const result = await controller.syncUser(userData);
      expect(mockUsersService.syncUser).toHaveBeenCalledWith(userData);
      expect(result).toEqual(userData);
    });
  });
});
