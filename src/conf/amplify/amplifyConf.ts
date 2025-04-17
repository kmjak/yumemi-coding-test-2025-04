'server-only';

import { ResourcesConfig } from 'aws-amplify';

/**
 * @file amplifyConf.ts
 * @description AWS Amplifyの設定ファイル
 * @exports amplifyConf
 *
 * @author @kmjak
 */
export const amplifyConf: ResourcesConfig = {
  API: {
    GraphQL: {
      endpoint: process.env.APPSYNC_ENDPOINT || '',
      region: process.env.APPSYNC_REGION || '',
      defaultAuthMode: 'apiKey',
      apiKey: process.env.APPSYNC_API_KEY || '',
    },
  },
};
