import HttpException from '../exceptions/HttpException';
import howlModel from '../models/howls.model';
import userModel from '../models/users.model';

class HowlsService {
  public howls = howlModel;
  public users = userModel;

  public async makeHowl(userId: string, howlText: string) {
    if (typeof howlText !== 'string' || howlText === '') throw new HttpException(400, 'Howl must contain text');
    const howl = await this.howls.create({ userId, text: howlText });
    return howl;
  }

  public async getHowlsByUserId(userId: string) {
    const allHowls = await this.howls.find({ userId });
    return allHowls;
  }
}

export default HowlsService;
