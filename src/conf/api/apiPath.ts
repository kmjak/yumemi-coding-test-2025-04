import { ApiPath } from '@/types/api/conf/ApiPath';

export const apiPath: ApiPath = {
  // APIから都道府県一覧を取得するパス
  PREFECTURES: '/api/v1/prefectures',
  // APIから人口構成を取得するパス
  POPULATION_COMPOSITION: '/api/v1/population/composition/perYear',
};
