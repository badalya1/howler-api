import bcrypt from 'bcrypt';
import HttpException from '../exceptions/HttpException';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import { isEmpty } from '../utils/util';

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, 'Cannot find user');

    return findUser;
  }

  public async updateUser(userId: string, userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'User Data must be provided');

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const updateUserById: User = await this.users.findByIdAndUpdate(userId, { ...userData, password: hashedPassword });
    if (!updateUserById) throw new HttpException(409, 'Cannot find user details');

    return updateUserById;
  }

  public async deleteUserData(userId: string): Promise<User> {
    // ? Should user be deleted or be marked as deleted
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    // ? Should howls by this used be removed?
    // await this.howls.deleteMany({userId});
    if (!deleteUserById) throw new HttpException(409, 'Cannot find user');

    return deleteUserById;
  }
}

export default UserService;
