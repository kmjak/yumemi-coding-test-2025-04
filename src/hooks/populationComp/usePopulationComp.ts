import { PopulationCompResponse } from '@/types/models/populationComp/PopulationCompResponse';
import getPopulationCompByPrefCode from '@/usecases/populationComp/getPopulationCompByPrefCode';

/**
 * @file usePopulationComp.ts
 * @description 人口構成に関するhandlerをまとめたカスタムフック
 * @returns {
 *   handleGetPopulationCompByPrefCode, // 都道府県コードを指定して、人口構成の情報を取得するハンドラー
 * }
 *
 * @author @kmjak
 */

export default function usePopulationComp() {
  /**
   * 都道府県コードを指定して、人口構成の情報を取得するハンドラー
   * @param prefCode 都道府県コード
   * @returns 都道府県の人口構成情報
   */
  const handleGetPopulationCompByPrefCode = async ({
    prefCode,
  }: {
    prefCode: number;
  }): Promise<PopulationCompResponse | undefined> => {
    try {
      const populationCompResponse: PopulationCompResponse = await getPopulationCompByPrefCode({
        prefCode,
      });
      return populationCompResponse;
    } catch {
      // エラーが発生した場合はundefinedを返す
      return undefined;
    }
  };

  return {
    handleGetPopulationCompByPrefCode,
  };
}
