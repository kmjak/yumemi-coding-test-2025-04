import { PopulationComposition } from '@/types/api/PopulationComposition';

/**
 * getPopulationCompositionのレスポンスのデータ構造
 */
export interface PopulationCompositionResponse {
  // 実績値と推計値の区切り年
  boundaryYear: number;
  // 人口構成のカテゴリごとのデータ
  data: PopulationComposition[];
}
