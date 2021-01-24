import { NextFunction, Request, Response } from 'express';
import { User } from '../interfaces/users.interface';
import howlService from '../services/howls.service';
import { Document } from 'mongoose';
import { Howl } from '../interfaces/howls.interface';
import { CreateHowlDto } from '../dtos/howls.dto';

type AuthenticatedRequest = Request & { user: User & Document };
class HowlsController {
  public howlService = new howlService();

  /* eslint-disable */
  public getHowls = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const findAllHowls: Howl[] = await this.howlService.findAllHowls();
      res.status(200).json({ data: findAllHowls, message: 'AllHowls' });
    } catch (error) {
      next(error);
    }
  };

  public getHowlById = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const howlId: string = req.params.id;

    try {
      const findOneHowl: Howl = await this.howlService.findHowlById(howlId);
      res.status(200).json({ data: findOneHowl, message: 'HowlById' });
    } catch (error) {
      next(error);
    }
  };

  public createHowl = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const howlData: CreateHowlDto = req.body;
    const userId = req.user.id;

    try {
      const createUserData: Howl = await this.howlService.createHowl(userId, howlData);
      res.status(201).json({ data: createUserData, message: 'CreateHowl' });
    } catch (error) {
      next(error);
    }
  };

  public updateHowl = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {};

  public getHowlsByUserId = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId: string = req.params.userId;
    try {
      const howlsByUserId: Howl[] = await this.howlService.getHowlsByUserId(userId);
      res.status(200).json({ data: howlsByUserId, message: 'howlsByUser' });
    } catch (error) {
      next(error);
    }
  };

  public deleteHowl = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {};
}

export default HowlsController;
