import { Types } from 'mongoose';

export interface Howl {
  text: string;
  owner: Types.ObjectId;
}
