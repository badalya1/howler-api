import { Types } from 'mongoose';

export interface Howl {
  text: string;
  userId: Types.ObjectId;
  parentHowl?: Types.ObjectId;
  likes: Types.Array<Types.ObjectId>;
}
