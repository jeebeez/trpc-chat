import { ACCEPTED_IMAGE_TYPES } from '~/utils/constants';
import { z } from 'zod';
import messageModel, { type MessageDocument } from 'src/models/user.model';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import s3 from 'src/utils/aws';
import { v4 as uuidv4 } from 'uuid';

const BUCKET_NAME = process.env.IMAGE_STORAGE_S3_BUCKET ?? 'chatimagesproject';

export const userRouter = createTRPCRouter({
  addMessage: publicProcedure
    .input(
      z.object({
        text: z.string({
          required_error: 'Add your message',
        }),
        type: z
          .string()
          .optional()
          .refine((type) => ACCEPTED_IMAGE_TYPES.includes(type), {
            message: '.jpg, .jpeg, .png and .webp files are accepted.',
          }),

        hasImage: z.boolean().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const imageId = uuidv4();
      const name = `images/${imageId}`;

      const { text, type, hasImage } = input;

      let url = '';

      try {
        if (hasImage) {
          const fileParams = {
            Bucket: BUCKET_NAME,
            Key: name,
            Expires: 6000,
            ContentType: type,
            ACL: 'private',
          };
          url = await s3.getSignedUrlPromise('putObject', fileParams);
        }

        await messageModel().create({
          text,
          imageId: hasImage ? name : '',
        });

        return url;
      } catch (e) {
        throw new Error('Cant post message, please try again');
      }
    }),

  all: publicProcedure.query(async (): Promise<MessageDocument[]> => {
    try {
      const allMessages = await messageModel()
        .find({
          isDeleted: false,
        })
        .sort({
          createdAt: -1,
        })
        .lean();
      const extendedImages = await Promise.all(
        allMessages.map(async (message) => {
          if (message.imageId) {
            const name = message.imageId;

            const url = await s3.getSignedUrlPromise('getObject', {
              Bucket: BUCKET_NAME,
              Expires: 100000,
              Key: name,
            });

            return { url, ...message };
          }

          return message;
        }),
      );

      return extendedImages;
    } catch (e) {
      throw new Error('Cant get messages, please try again');
    }
  }),

  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    try {
      await messageModel().updateOne(
        {
          _id: input,
        },
        {
          $set: {
            isDeleted: true,
          },
        },
      );
    } catch (err) {
      throw new Error('Cant delete messages, please try again');
    }
  }),
});

export default userRouter;
