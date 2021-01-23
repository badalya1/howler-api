import { NextFunction, Request, Response } from 'express';
import { User } from '../interfaces/users.interface';
import howlService from '../services/howls.service';
import { Document } from 'mongoose';

type AuthenticatedRequest = Request & { user: User & Document };
class HowlsController {
  public howlService = new howlService();

  /* eslint-disable */
  public getHowls = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {};

  public getHowlsByUserId = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {};

  public deleteHowl = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {};
}

export default HowlsController;
