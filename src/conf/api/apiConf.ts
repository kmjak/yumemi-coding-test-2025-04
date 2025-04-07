import { ApiConf } from '@/types/api/conf/ApiConf';

export const apiConf: ApiConf = {
  // APIのエンドポイント
  API_ENDPOINT: process.env.API_ENDPOINT || '',
  // リクエストヘッダーに乗せるAPIキー
  X_API_KEY: process.env.X_API_KEY || '',
};
