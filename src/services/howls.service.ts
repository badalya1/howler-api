import { CreateHowlDto } from '../dtos/howls.dto';
import HttpException from '../exceptions/HttpException';
import { Howl } from '../interfaces/howls.interface';
import howlModel from '../models/howls.model';
import userModel from '../models/users.model';
import { isEmpty } from '../utils/util';

class HowlsService {
  public howls = howlModel;
  public users = userModel;

  public async findAllHowls(): Promise<Howl[]> {
    const howls = await this.howls.find();
    return howls;
  }
  public async findHowlById(howlId: string): Promise<Howl> {
    const howl: Howl = await this.howls.findOne({ _id: howlId });
    if (!howl) throw new HttpException(404, `Howl with id ${howlId} was not found`);

    return howl;
  }
  public async createHowl(userId: string, howlData: CreateHowlDto) {
    const howlText = howlData.text;
    if (typeof howlText !== 'string' || howlText === '') throw new HttpException(400, 'Howl must contain text');
    const howl = await this.howls.create({ userId, text: howlText });
    return howl;
  }

  public async getHowlsByUserId(userId: string): Promise<Howl[]> {
    const allHowls = await this.howls.find({ userId });
    return allHowls;
  }

  public async updateHowl(howlId: string, howlData: Howl): Promise<Howl> {
    if (isEmpty(howlData)) throw new HttpException(400, 'Howl data must be provided');

    const updateHowlById: Howl = await this.howls.findByIdAndUpdate(howlId, howlData);
    if (!updateHowlById) throw new HttpException(409, 'Cannot find the howl');

    return updateHowlById;
  }

  public async deleteHowl(howlId: string): Promise<Howl> {
    const deleteHowlById: Howl = await this.howls.findByIdAndDelete(howlId);
    if (!deleteHowlById) throw new HttpException(409, 'Could not delete the howl');

    return deleteHowlById;
  }
}

export default HowlsService;
