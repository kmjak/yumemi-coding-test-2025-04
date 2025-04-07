// Population Composition APIから取得した年ごとの人口構成データの型
export interface YearlyPopulationData {
  // 年
  year: number;
  // 人口構成データ
  value: number;
}
