import { PopulationComp } from '@/types/api/models/populationComp/PopulationComp';

/**
 * fetchPopulationCompのレスポンスのデータ構造
 */
export interface PopulationCompResponse {
  // 実績値と推計値の区切り年
  boundaryYear: number;
  // 人口構成のカテゴリごとのデータ
  data: PopulationComp[];
}
