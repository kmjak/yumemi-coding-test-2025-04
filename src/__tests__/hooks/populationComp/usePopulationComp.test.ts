import { renderHook, act } from '@testing-library/react';
import usePopulationComp from '@/hooks/populationComp/usePopulationComp';
import { PopulationCompResponse } from '@/types/models/populationComp/PopulationCompResponse';
import getPopulationCompByPrefCode from '@/usecases/populationComp/getPopulationCompByPrefCode';

jest.mock('@/usecases/populationComp/getPopulationCompByPrefCode');
const mockedGetPopulationCompByPrefCode = getPopulationCompByPrefCode as jest.Mock;

// モックデータ
const populationCompResponse: PopulationCompResponse = {
  boundaryYear: 2020,
  data: [
    {
      label: '総人口',
      data: [
        { year: 1980, value: 100000 },
        { year: 1990, value: 110000 },
      ],
    },
    {
      label: '年少人口',
      data: [
        { year: 1980, value: 20000 },
        { year: 1990, value: 22000 },
      ],
    },
    {
      label: '生産年齢人口',
      data: [
        { year: 1980, value: 60000 },
        { year: 1990, value: 66000 },
      ],
    },
    {
      label: '老年人口',
      data: [
        { year: 1980, value: 20000 },
        { year: 1990, value: 22000 },
      ],
    },
  ],
};
/**
 * @file usePopulationComp.test.ts
 * @description usePopulationCompのテスト
 * @see src/hooks/populationComp/usePopulationComp.ts
 *
 * @author @kmjak
 */
describe('usePopulationComp', () => {
  /**
   * テストケース: handleGetPopulationCompByPrefCodeで人口構成データを取得できることを確認する
   *
   * @expect
   * populationComp: PopulationCompResponse
   */
  it('handleGetPopulationCompByPrefCodeからデータが取得できているか', async () => {
    mockedGetPopulationCompByPrefCode.mockResolvedValue(populationCompResponse);
    const { result } = renderHook(() => usePopulationComp());
    await act(async () => {
      const populationComp: PopulationCompResponse | undefined =
        await result.current.handleGetPopulationCompByPrefCode({ prefCode: 1 });
      expect(populationComp).toEqual(populationCompResponse);
    });
  });

  /**
   * テストケース: prefCodeが不正な値の場合undefinedが返ることを確認する
   *
   * @expect
   * populationComp: undefined
   */
  it('prefCodeが不正な値の場合undefinedが返る', async () => {
    mockedGetPopulationCompByPrefCode.mockResolvedValue(undefined);
    const { result } = renderHook(() => usePopulationComp());
    await act(async () => {
      const populationComp: PopulationCompResponse | undefined =
        await result.current.handleGetPopulationCompByPrefCode({ prefCode: -1 });
      expect(populationComp).toBeUndefined();
    });
  });

  /**
   * テストケース: handleGetPopulationCompByPrefCodeでエラーが発生した場合、undefinedが返ることを確認する
   *
   * @expect
   * populationComp: undefined
   */
  it('handleGetPopulationCompByPrefCodeでエラーが発生した場合、undefinedが返る', async () => {
    mockedGetPopulationCompByPrefCode.mockRejectedValue(new Error('Error'));
    const { result } = renderHook(() => usePopulationComp());
    await act(async () => {
      const populationComp: PopulationCompResponse | undefined =
        await result.current.handleGetPopulationCompByPrefCode({ prefCode: 1 });
      expect(populationComp).toBeUndefined();
    });
  });
});
