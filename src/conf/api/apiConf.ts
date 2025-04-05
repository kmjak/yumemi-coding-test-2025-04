import { ApiConf } from '@/types/api/ApiConf';

export const apiConf: ApiConf = {
  API_ENDPOINT: process.env.API_ENDPOINT || '',
  X_API_KEY: process.env.X_API_KEY || '',
};
