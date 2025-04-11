/**
 * @file ApiConf.ts
 * @exports ApiConf
 * @description APIの設定に関する定数の型定義
 *
 * @author @kmjak
 */

export interface ApiConf {
  // APIのエンドポイント
  API_ENDPOINT: string;
  // リクエストヘッダーに乗せるAPIキー
  X_API_KEY: string;
}
