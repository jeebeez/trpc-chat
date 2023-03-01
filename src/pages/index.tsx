import { type NextPage } from 'next';
import Head from 'next/head';
import Chat from '~/components/Chat';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Chat App</title>
        <meta name='description' content='Chat app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className=' flex h-[100vh] items-center justify-center bg-gradient-to-bl  from-red-200 via-red-300 to-yellow-200 text-gray-900'>
        <Chat />
      </div>
    </>
  );
};

export default Home;
