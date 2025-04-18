import { PopulationCompResponse } from '@/types/models/populationComp/PopulationCompResponse';
import getPopulationCompByPrefCode from '@/usecases/populationComp/getPopulationCompByPrefCode';
import isValidPrefCode from '@/utils/prefecture/isValidPrefCode';

/**
 * @file usePopulationComp.ts
 * @description 人口構成に関するhandlerをまとめたカスタムフック
 * @returns {
 *   handleGetPopulationCompByPrefCode, // 都道府県コードを指定して、人口構成の情報を取得するハンドラー
 * }
 *
 * @author @kmjak
 */

/**
 * @interface UsePopulationCompReturn
 * @description usePopulationCompの戻り値の型
 * @property {function} handleGetPopulationCompByPrefCode - 都道府県コードを指定して、人口構成の情報を取得するハンドラー
 *
 */
interface UsePopulationCompReturn {
  handleGetPopulationCompByPrefCode: ({
    prefCode,
  }: {
    prefCode: number;
  }) => Promise<PopulationCompResponse | undefined>;
}

export default function usePopulationComp(): UsePopulationCompReturn {
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
    // 都道府県コードが不正な場合はundefinedを返す
    if (isValidPrefCode({ prefCode }) === false) {
      return undefined;
    }

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
