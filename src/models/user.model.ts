import mongoose, { type Model, model, type ObjectId, Schema } from 'mongoose';

export interface Message {
  text: string;
  isDeleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
  _id: ObjectId;
  imageId?: string;
}

export interface MessageDocument {
  text: string;
  isDeleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
  _id: string | ObjectId;
  imageId?: string;
  url?: string;
}

const messageSchema = new Schema<Message>(
  {
    text: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    imageId: {
      type: String,
    },
  },
  { timestamps: true },
);

const messageModel = (): Model<Message> => {
  return mongoose.models && mongoose.models.Message
    ? mongoose.models.Message
    : model<Message>('Message', messageSchema);
};

export default messageModel;
