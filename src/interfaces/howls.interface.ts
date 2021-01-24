import { Types } from 'mongoose';

export interface Howl {
  text: string;
  userId: Types.ObjectId;
}
