import { PopulationLabel } from './PopulationLabel';
import { YearlyPopulationData } from './YearlyPopulationData';

/**
 * @file PopulationDataByLabel.ts
 * @description
 * 人口構成のカテゴリごとのデータ構造
 * 総人口、年少人口、生産年齢人口、老年人口
 * @exports PopulationDataByLabel
 *
 * @author @kmjak
 */
export type PopulationDataByLabel = {
  [Key in PopulationLabel]?: YearlyPopulationData[];
};
