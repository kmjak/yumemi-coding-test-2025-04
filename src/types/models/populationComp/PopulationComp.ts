import { YearlyPopulationData } from '@/types/models/populationComp/YearlyPopulationData';

/**
 * 人口構成のカテゴリごとのデータ構造
 * 総人口、年少人口、生産年齢人口、老年人口
 */
export interface PopulationComp {
  label: string;
  data: YearlyPopulationData[];
}
