import { renderHook, act } from '@testing-library/react';
import usePrefecture from '@/hooks/prefecture/usePrefecture';

/**
 * @file usePrefecture.test.ts
 * @description usePrefectureのテスト
 * @see src/hooks/prefecture/usePrefecture.ts
 *
 * @author @kmjak
 */
describe('usePrefecture', () => {
  /**
   * テストケース: 初期状態のcheckedPrefecturesが空であることを確認する
   *
   * @expect
   * checkedPrefecturesが空の配列であること
   */
  it('初期状態のcheckedPrefecturesが空', () => {
    const { result } = renderHook(() => usePrefecture());
    expect(result.current.checkedPrefectures).toEqual([]);
  });

  /**
   * テストケース: handleTogglePrefCodeを呼び出すとcheckedPrefecturesに都道府県番号が追加されることを確認する
   *
   * @expect
   * checkedPrefectures: [1]
   * isChecked: true
   */
  it('都道府県番号が追加される', () => {
    const { result } = renderHook(() => usePrefecture());

    act(() => {
      const isChecked: boolean = result.current.handleTogglePrefCode({ prefCode: 1 });
      expect(isChecked).toBe(true);
    });

    expect(result.current.checkedPrefectures).toEqual([1]);
  });

  /**
   * テストケース: handleTogglePrefCodeを呼び出すとcheckedPrefecturesから都道府県番号が削除されることを確認する
   *
   * @expect
   * checkedPrefectures: []
   * isChecked: false
   */
  it('checkedPrefecturesに入っている都道府県番号を渡すと消される', () => {
    const { result } = renderHook(() => usePrefecture());

    act(() => {
      result.current.handleTogglePrefCode({ prefCode: 1 });
    });

    expect(result.current.checkedPrefectures).toEqual([1]);

    act(() => {
      const isChecked: boolean = result.current.handleTogglePrefCode({ prefCode: 1 });
      expect(isChecked).toBe(false);
    });

    expect(result.current.checkedPrefectures).toEqual([]);
  });

  /**
   * テストケース: prefCodeが不正な値の場合
   *
   * @expect
   * checkedPrefectures: []
   * isChecked: false
   */
  it('prefCodeが不正な値の場合、checkedPrefecturesに追加されず、falseが返ってくる', () => {
    const { result } = renderHook(() => usePrefecture());

    act(() => {
      const isChecked: boolean = result.current.handleTogglePrefCode({ prefCode: -1 });
      expect(isChecked).toBe(false);
    });

    expect(result.current.checkedPrefectures).toEqual([]);
  });

  /**
   * テストケース: handleDeselectAllでcheckedPrefecturesから全て取り除く
   *
   * @expect
   * checkedPrefectures: []
   */

  it('handleDeselectAllでcheckedPrefecturesから全て取り除く', () => {
    const { result } = renderHook(() => usePrefecture());

    act(() => {
      result.current.handleTogglePrefCode({ prefCode: 1 });
      result.current.handleTogglePrefCode({ prefCode: 2 });
    });

    expect(result.current.checkedPrefectures).toEqual([1, 2]);

    act(() => {
      result.current.handleDeselectAll();
    });

    expect(result.current.checkedPrefectures).toEqual([]);
  });
});
