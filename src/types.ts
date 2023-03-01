import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from './server/api/root';

type RouterOutput = inferRouterOutputs<AppRouter>;
type allMessages = RouterOutput['user']['all'];

export type Message = allMessages[number];
