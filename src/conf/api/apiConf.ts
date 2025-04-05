import { ApiConf } from '@/types/api/ApiConf';

export const apiConf: ApiConf = {
  API_END_POINT: process.env.API_END_POINT || '',
  X_API_KEY: process.env.X_API_KEY || '',
};
