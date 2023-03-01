import Image from 'next/image';
import TimeAgo from 'timeago-react';
import { Trash } from '~/assets/icons/Trash';

interface MessageProps {
  textMessage: string;
  imageUrl?: string;
  timeOfMessage: Date;
  deleteRecord: (id: string) => void;
  id: string;
}

const Messages = ({ textMessage, imageUrl, timeOfMessage, deleteRecord, id }: MessageProps) => {
  return (
    <div className='group'>
      <div className=' relative  inline-block max-w-sm bg-gray-200'>
        <div className='top-1 -right-7 hidden group-hover:absolute group-hover:block'>
          <Trash className='h-5 w-6' onClick={() => deleteRecord(id)} />
        </div>

        <p className='break-words p-2 text-sm'>{textMessage}</p>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt='image-message'
            className='max-h-96 max-w-sm object-contain'
            width={300}
            height={300}
          />
        ) : null}
      </div>
      <div>
        <TimeAgo className='ml-1 mt-1 text-xs text-gray-500' datetime={timeOfMessage} />
      </div>
    </div>
  );
};

export default Messages;
