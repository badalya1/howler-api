import { NextFunction, Request, Response } from 'express';
import { User } from '../interfaces/users.interface';
import howlService from '../services/howls.service';
import { Document } from 'mongoose';
import { Howl } from '../interfaces/howls.interface';
import { CreateHowlDto } from '../dtos/howls.dto';
import HttpException from '../exceptions/HttpException';

type AuthenticatedRequest = Request & { user: User & Document };
class HowlsController {
  public howlService = new howlService();

  /* eslint-disable */
  public retrieveHowls = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const findAllHowls: Howl[] = await this.howlService.findAllHowls();
      res.status(200).json({ data: findAllHowls, message: 'AllHowls' });
    } catch (error) {
      next(error);
    }
  };

  public retrieveHowlById = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
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

  public updateHowl = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId: string = req.user.id;
    const howlId: string = req.params.id;
    const howlData: Howl = req.body;

    try {
      const oldHowlData = await this.howlService.findHowlById(howlId);
      if (!oldHowlData.userId.equals(userId)) throw new HttpException(403, 'You are not the owner of that howl');
      // ? Should edited Howls be backed up in a different collection? can be used to implement edit history
      const updateHowlData: Howl = await this.howlService.updateHowl(howlId, howlData);
      res.status(200).json({ data: updateHowlData, message: 'Howl Updated' });
    } catch (error) {
      next(error);
    }
  };

  public retrieveHowlsByUserId = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId: string = req.params.userId || req.user.id;
    try {
      const howlsByUserId: Howl[] = await this.howlService.getHowlsByUserId(userId);
      res.status(200).json({ data: howlsByUserId, message: 'howlsByUser' });
    } catch (error) {
      next(error);
    }
  };

  public deleteHowl = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId: string = req.user.id;
    const howlId: string = req.params.id;
    try {
      const oldHowlData = await this.howlService.findHowlById(howlId);
      if (!oldHowlData.userId.equals(userId)) throw new HttpException(403, 'You are not the owner of that howl');
      const deleteHowlData: Howl = await this.howlService.deleteHowl(howlId);
      res.status(200).json({ data: deleteHowlData, message: 'howlDeleted' });
    } catch (error) {
      next(error);
    }
  };

  public createLike = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId: string = req.user.id;
    const howlId: string = req.params.id;
    try {
      const likeHowlData: Howl = await this.howlService.likeHowl(userId, howlId);
      res.status(200).json({ data: likeHowlData, message: 'howlLiked' });
    } catch (error) {
      next(error);
    }
  };

  public deleteLike = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId: string = req.user.id;
    const howlId: string = req.params.id;
    try {
      const unlikeHowlData: Howl = await this.howlService.unlikeHowl(userId, howlId);
      res.status(200).json({ data: unlikeHowlData, message: 'howlUnliked' });
    } catch (error) {
      next(error);
    }
  };
}

export default HowlsController;
