import { NextFunction, Request, Response } from 'express';
import { User } from '../interfaces/users.interface';
import userService from '../services/users.service';
import { Document } from 'mongoose';

type AuthenticatedRequest = Request & { user: User & Document };
class UsersController {
  public userService = new userService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();
      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.id;

    try {
      const findOneUserData: User = await this.userService.findUserById(userId);
      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId: string = req.user.id;
    const userData: User = req.body;

    try {
      const updateUserData: User = await this.userService.updateUser(userId, userData);
      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId: string = req.user.id;
    //TODO: Require password when deleting the user
    try {
      const deleteUserData: User = await this.userService.deleteUserData(userId);
      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
