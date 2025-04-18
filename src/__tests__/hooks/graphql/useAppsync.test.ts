import { renderHook } from '@testing-library/react';
import useAppsync from '@/hooks/graphql/useAppsync';
import getPrefCodes from '@/usecases/graphql/getPrefCodes';
import resetPrefCodes from '@/usecases/graphql/reestPrefCodes';
import updatePrefCodes from '@/usecases/graphql/updatePrefCodes';

// モックのセットアップ
jest.mock('@/usecases/graphql/getPrefCodes');
jest.mock('@/usecases/graphql/reestPrefCodes');
jest.mock('@/usecases/graphql/updatePrefCodes');

/**
 * @file useAppsync.test.ts
 * @description useAppsyncのテスト
 * @see src/hooks/appsync/useAppsync.ts
 *
 * @author @kmjak
 */

describe('useAppsync', () => {
  const roomId = 'test-room';

  /**
   * handleUpdatePrefCodes
   * テストケース: 都道府県番号の更新が成功する場合
   *
   * @expect
   * true
   */
  it('都道府県番号の更新が成功', async () => {
    (updatePrefCodes as jest.Mock).mockResolvedValue(true);

    const { result } = renderHook(() => useAppsync());

    const isSuccess: boolean = await result.current.handleUpdatePrefCodes({
      roomId,
      prefCode: 1,
      checkedPrefectures: [1, 2, 3],
    });

    expect(isSuccess).toBe(true);
    expect(updatePrefCodes).toHaveBeenCalledWith({
      roomId,
      prefCode: 1,
      checkedPrefectures: [1, 2, 3],
    });
  });

  /**
   * handleUpdatePrefCodes
   * テストケース: 都道府県番号の更新が失敗する場合
   *
   * @expect
   * false
   */
  it('都道府県番号の更新が失敗', async () => {
    (updatePrefCodes as jest.Mock).mockRejectedValue(new Error('Update failed'));

    const { result } = renderHook(() => useAppsync());

    const isSuccess: boolean = await result.current.handleUpdatePrefCodes({
      roomId,
      prefCode: 1,
      checkedPrefectures: [1, 2, 3],
    });

    expect(isSuccess).toBe(false);
  });

  /**
   * handleResetPrefCodes
   * テストケース: 都道府県番号のリセットが成功する場合
   *
   * @expect
   * true
   */
  it('都道府県番号のリセットが成功', async () => {
    (resetPrefCodes as jest.Mock).mockResolvedValue(true);

    const { result } = renderHook(() => useAppsync());

    const isReset: boolean = await result.current.handleResetPrefCodes({ roomId });

    expect(isReset).toBe(true);
    expect(resetPrefCodes).toHaveBeenCalledWith({ roomId });
  });

  /**
   * handleResetPrefCodes
   * テストケース: 都道府県番号のリセットが失敗する場合
   *
   * @expect
   * false
   */
  it('都道府県番号のリセットが失敗', async () => {
    (resetPrefCodes as jest.Mock).mockRejectedValue(new Error('Reset failed'));

    const { result } = renderHook(() => useAppsync());

    const isReset: boolean = await result.current.handleResetPrefCodes({ roomId });

    expect(isReset).toBe(false);
  });

  /**
   * handleGetPrefCodes
   * テストケース: 都道府県番号の取得が成功する場合
   *
   * @expect
   * [1, 2, 3]
   */
  it('都道府県番号の取得が成功', async () => {
    (getPrefCodes as jest.Mock).mockResolvedValue([1, 2, 3]);

    const { result } = renderHook(() => useAppsync());

    const prefCodes: number[] = await result.current.handleGetPrefCodes({ roomId });

    expect(prefCodes).toEqual([1, 2, 3]);
    expect(getPrefCodes).toHaveBeenCalledWith({ roomId });
  });

  /**
   * handleGetPrefCodes
   * テストケース: 都道府県番号の取得が失敗する場合
   *
   * @expect
   * []
   */
  it('都道府県番号の取得が失敗', async () => {
    (getPrefCodes as jest.Mock).mockRejectedValue(new Error('Get failed'));

    const { result } = renderHook(() => useAppsync());

    const prefCodes: number[] = await result.current.handleGetPrefCodes({ roomId });

    expect(prefCodes).toEqual([]);
  });
});
