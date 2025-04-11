/**
 * @file ApiPath.ts
 * @exports ApiPath
 * @description APIのパスを定義する
 *
 * @author @kmjak
 */

export interface ApiPath {
  // APIから都道府県一覧を取得するパス
  PREFECTURES: string;
  // APIから人口構成を取得するパス
  POPULATION_COMP: string;
}
