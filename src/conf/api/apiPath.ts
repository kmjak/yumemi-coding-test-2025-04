import { ApiPath } from '@/types/api/ApiPath';

export const apiPath: ApiPath = {
  // APIから都道府県一覧を取得できるパス
  PREFECTURES: '/api/v1/prefectures',
  // APIから人口構成を取得できるパス
  POPULATION_COMPOSITION: '/api/v1/population/composition/perYear',
};
