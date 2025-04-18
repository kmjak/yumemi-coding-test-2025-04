'use client';

import { Amplify, ResourcesConfig } from 'aws-amplify';

/**
 * @description ConfigureAmplifyClientSidePropsの型定義
 * @property {ResourcesConfig} amplifyConf - AWS Amplifyの設定
 * @returns {null} - nullを返す
 */
interface ConfigureAmplifyClientSideProps {
  amplifyConf: ResourcesConfig;
}

/**
 * @file ConfigureAmplifyClientSide.tsx
 * @description AWS Amplifyのclient側の設定を行うコンポーネント
 * @param {ConfigureAmplifyClientSideProps} props - AWS Amplifyの設定
 * @returns {null} - nullを返す
 *
 * @author @kmjak
 */
export default function ConfigureAmplifyClientSide({
  amplifyConf,
}: ConfigureAmplifyClientSideProps): null {
  Amplify.configure(amplifyConf);

  return null;
}
