'server-only';

import { ResourcesConfig } from 'aws-amplify';

/**
 * @file appsyncConf.ts
 * @description AWS AppSyncの設定
 * @exports appsyncConf
 *
 * @author @kmjak
 */
export const appsyncConf: ResourcesConfig = {
  API: {
    GraphQL: {
      endpoint: process.env.APPSYNC_ENDPOINT || '',
      region: process.env.APPSYNC_REGION || '',
      defaultAuthMode: 'apiKey',
      apiKey: process.env.APPSYNC_API_KEY || '',
    },
  },
};
