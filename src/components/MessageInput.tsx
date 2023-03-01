import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { PaperClip } from '~/assets/icons/PaperClip';
import { ACCEPTED_IMAGE_TYPES } from '~/utils/constants';

interface MessageInputProps {
  onSubmit: () => Promise<void>;
  onFileSelect: (argo0: ChangeEvent<HTMLInputElement>) => void;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
}

const MessageInput = ({ onSubmit, onFileSelect, text, setText }: MessageInputProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(async () => {
    if (text) {
      await onSubmit();
    }
  }, [onSubmit, text]);

  useEffect(() => {
    textRef.current?.focus();
  }, []);

  return (
    <div className='flex space-x-2 rounded-b-xl bg-white p-4'>
      <input
        type={'text'}
        ref={textRef}
        value={text}
        tabIndex={1}
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && text) {
            return void handleSubmit();
          }
        }}
        placeholder='Enter Message ...'
        className='w-80 rounded border-2 border-gray-700 px-4 py-2'
      />
      <div className='relative h-11 w-11 rounded border-2 border-gray-700'>
        <input
          type={'file'}
          id='image'
          ref={fileRef}
          className='hidden'
          accept={ACCEPTED_IMAGE_TYPES.join(',')}
          onChange={onFileSelect}
        />
        <button
          onClick={() => fileRef.current?.click()}
          tabIndex={2}
          className='h-full w-full cursor-pointer p-1'
        >
          <PaperClip />
        </button>
      </div>
      <button
        tabIndex={3}
        disabled={!text}
        className='w-24 cursor-pointer rounded bg-blue-500 px-4 py-2 text-white transition-all duration-200 disabled:cursor-not-allowed disabled:bg-gray-200'
        onClick={() => void handleSubmit()}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
