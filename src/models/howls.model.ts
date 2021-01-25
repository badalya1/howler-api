import { model, Schema, Document } from 'mongoose';
import { Howl } from '../interfaces/howls.interface';

const ObjectId = Schema.Types.ObjectId;

export const howlsSchema: Schema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    userId: {
      type: ObjectId,
      ref: 'users',
      required: true,
    },
    likes: {
      type: [ObjectId],
      ref: 'users',
      required: true,
      default: [],
    },
    parentHowl: {
      type: ObjectId,
      ref: 'howls',
    },
  },
  {
    timestamps: true,
  },
);

const howlModel = model<Howl & Document>('Howl', howlsSchema);

export default howlModel;
