import { ApiConf } from '@/types/conf/api/ApiConf';

/**
 * @file apiConf.ts
 * @exports apiConf
 * @description APIの設定に関する定数を定義する
 *
 * @author @kmjak
 */

export const apiConf: ApiConf = {
  // APIのエンドポイント
  API_ENDPOINT: process.env.API_ENDPOINT || '',
  // リクエストヘッダーに乗せるAPIキー
  X_API_KEY: process.env.X_API_KEY || '',
};
