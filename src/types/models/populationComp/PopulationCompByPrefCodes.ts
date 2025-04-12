import { PopulationDataByLabel } from './PopulationDataByLabel';

/**
 * @file PopulationCompByPrefCodes.ts
 * @description
 * 都道府県コードごとの人口構成データの型定義
 * @exports PopulationCompByPrefCodes
 *
 * @author @kmjak
 */
export interface PopulationCompByPrefCodes {
  [prefCode: number]: PopulationDataByLabel;
}
