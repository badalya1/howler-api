import { Router } from 'express';
import HowlsController from '../controllers/howls.controller';
import { CreateHowlDto } from '../dtos/howls.dto';
import Route from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';

class HowlsRoute implements Route {
  public path = '/howls';
  public router = Router();
  public howlsController = new HowlsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.howlsController.retrieveHowls);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateHowlDto, 'body', true), this.howlsController.createHowl);
    this.router.get(`${this.path}/user`, authMiddleware, this.howlsController.retrieveHowlsByUserId);
    this.router.get(`${this.path}/user/:userId`, authMiddleware, this.howlsController.retrieveHowlsByUserId);
    this.router.get(`${this.path}/:id`, authMiddleware, this.howlsController.retrieveHowlById);
    this.router.post(`${this.path}/:id/like`, authMiddleware, this.howlsController.createLike);
    this.router.post(`${this.path}/:id/unlike`, authMiddleware, this.howlsController.deleteLike);
    this.router.put(`${this.path}/:id`, authMiddleware, validationMiddleware(CreateHowlDto, 'body', true), this.howlsController.updateHowl);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.howlsController.deleteHowl);
  }
}

export default HowlsRoute;
