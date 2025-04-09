import { EnvConf } from '@/types/env/EnvConf';

/**
 * @file envConf.ts
 * @exports envConf
 * @description 環境設定に関する定数を定義する
 *
 * @author @kmjak
 */

export const envConf: EnvConf = {
  // hostのURL
  HOST_URL: process.env.NEXT_PUBLIC_HOST_URL || '',
};
