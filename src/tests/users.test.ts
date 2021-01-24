import mongoose from 'mongoose';
import request from 'supertest';
import App from '../app';
import UsersRoute from '../routes/users.route';
import authMiddleware from '../middlewares/auth.middleware';
import { mocked } from 'ts-jest/utils';
import { User } from '../interfaces/users.interface';

jest.mock('../middlewares/auth.middleware');
const mockUser = {
  username: 'exampleUsername',
  password: 'q1w2e3r4!',
  verified: false,
} as User;

mocked(authMiddleware).mockImplementation(async (req, res, next) => {
  req.user = mockUser;
  next();
});

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {
  describe('GET /users', () => {
    it('response All Users', () => {
      const usersRoute = new UsersRoute();
      usersRoute.usersController.userService.users.find = jest.fn().mockReturnValue(
        Promise.resolve([
          {
            username: 'exampleUsername',
            password: 'q1w2e3r4!',
          },
        ]),
      );

      (mongoose as any).connect = jest.fn(() => Promise.resolve({}));
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}`).expect(200);
    });
  });
});
