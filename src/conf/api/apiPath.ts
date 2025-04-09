import { ApiPath } from '@/types/api/conf/ApiPath';

/**
 * @file apiPath.ts
 * @exports apiPath
 * @description: APIのパスに関する定数を定義する
 *
 * @author @kmjak
 */

export const apiPath: ApiPath = {
  // APIから都道府県一覧を取得するパス
  PREFECTURES: '/api/v1/prefectures',
  // APIから人口構成を取得するパス
  POPULATION_COMP: '/api/v1/population/composition/perYear',
};
