import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import App from '../app';
import AuthRoute from '../routes/auth.route';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { TokenData } from '../interfaces/auth.interface';
import AuthService from '../services/auth.service';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing AuthController', () => {
  describe('POST /signup', () => {
    it('response should have the userData', () => {
      const userData: CreateUserDto = {
        username: 'badalya1',
        password: 'q1w2e3r4!',
      };

      const authRoute = new AuthRoute();

      authRoute.authController.authService.users.findOne = jest.fn().mockReturnValue(Promise.resolve(undefined));

      authRoute.authController.authService.users.create = jest.fn().mockReturnValue({ _id: 0, ...userData });

      (mongoose as any).connect = jest.fn(() => Promise.resolve({}));
      const app = new App([authRoute]);

      return request(app.getServer()).post('/signup').send(userData);
    });
  });

  describe('POST /login', () => {
    it('response should have the Set-Cookie header with the Authorization token', async () => {
      const userData: CreateUserDto = {
        username: 'badalya1',
        password: 'q1w2e3r4!',
      };
      process.env.JWT_SECRET = 'jwt_secret';

      const authRoute = new AuthRoute();

      authRoute.authController.authService.users.findOne = jest.fn().mockReturnValue(
        Promise.resolve({
          _id: 0,
          username: 'badalya1',
          password: await bcrypt.hash(userData.password, 10),
        }),
      );

      (mongoose as any).connect = jest.fn(() => Promise.resolve({ data: {} }));
      const app = new App([authRoute]);
      return request(app.getServer())
        .post('/login')
        .send(userData)
        .expect('Set-Cookie', /^Authorization=.+/);
    });
  });

  describe('POST /logout', () => {
    it('logout Set-Cookie Authorization=; Max-age=0', () => {
      const authRoute = new AuthRoute();

      const app = new App([authRoute]);
      return request(app.getServer())
        .post('/logout')
        .expect('Set-Cookie', /^Authorization=\;/);
    });
  });
});

describe('Testing AuthService', () => {
  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const tokenData: TokenData = {
        token: '',
        expiresIn: 1,
      };

      const authService = new AuthService();

      expect(typeof authService.createCookie(tokenData)).toEqual('string');
    });
  });

  describe('when registering a user', () => {
    describe('if the username is already taken', () => {
      it('should throw an error', async () => {
        const userData: CreateUserDto = {
          username: 'badalya1',
          password: 'q1w2e3r4!',
        };

        const authService = new AuthService();

        authService.users.findOne = jest.fn().mockReturnValue(Promise.resolve(userData));

        await expect(authService.signup(userData)).rejects.toThrow(new HttpException(409, `Username ${userData.username} already exists`));
      });
    });

    describe('if the email is not token', () => {
      it('should not throw an error', async () => {
        const userData: CreateUserDto = {
          username: 'badalya1',
          password: 'q1w2e3r4!',
        };
        process.env.JWT_SECRET = 'jwt_secret';

        const authService = new AuthService();

        authService.users.findOne = jest.fn().mockReturnValue(Promise.resolve(undefined));

        authService.users.create = jest.fn().mockReturnValue({ _id: 0, ...userData });

        await expect(authService.signup(userData)).resolves.toBeDefined();
      });
    });
  });
});
