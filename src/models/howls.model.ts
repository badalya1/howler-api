import { model, Schema, Document } from 'mongoose';
import { Howl } from '../interfaces/howls.interface';

const ObjectId = Schema.Types.ObjectId;

const howlsSchema: Schema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    userId: {
      type: ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const howlModel = model<Howl & Document>('Howl', howlsSchema);

export default howlModel;
