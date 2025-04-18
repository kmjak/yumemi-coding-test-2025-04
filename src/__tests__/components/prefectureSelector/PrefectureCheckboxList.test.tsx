import { render, screen } from '@testing-library/react';
import PrefectureCheckboxList from '@/components/prefectureSelector/PrefectureCheckboxList';
import { Prefecture } from '@/types/models/prefecture/Prefecture';

const mockPrefectures: Prefecture[] = [
  { prefCode: 1, prefName: '北海道' },
  { prefCode: 2, prefName: '青森県' },
  { prefCode: 3, prefName: '岩手県' },
  { prefCode: 4, prefName: '宮城県' },
];

const checkedPrefectures: number[] = [1, 2];
/**
 * @file PrefectureCheckboxList.test.tsx
 * @description PrefectureCheckboxListコンポーネントのテスト
 * @see src/components/prefectureSelector/PrefectureCheckboxList
 *
 * @author @kmjak
 */
describe('DeselectAll', () => {
  /**
   * テストケース: DeselectAllコンポーネントが正しくレンダリングされるか
   */
  it('DeselectAllが正しくレンダリングされるか', () => {
    render(
      <PrefectureCheckboxList
        prefectures={mockPrefectures}
        checkedPrefectures={checkedPrefectures}
        handlePrefectureSelection={() => {}}
      />
    );
    expect(screen.getByText('都道府県一覧チェックボックス')).toBeInTheDocument();
    expect(screen.getByText('北海道')).toBeInTheDocument();
    expect(screen.getByText('青森県')).toBeInTheDocument();
    expect(screen.getByText('岩手県')).toBeInTheDocument();
    expect(screen.getByText('宮城県')).toBeInTheDocument();
  });

  /**
   * テストケース: チェックボックスが正しくチェックされているか
   */
  it('正しくチェックされているか', () => {
    render(
      <PrefectureCheckboxList
        prefectures={mockPrefectures}
        checkedPrefectures={checkedPrefectures}
        handlePrefectureSelection={() => {}}
      />
    );

    expect(screen.getByLabelText('北海道')).toBeChecked();
    expect(screen.getByLabelText('青森県')).toBeChecked();
    expect(screen.getByLabelText('岩手県')).not.toBeChecked();
    expect(screen.getByLabelText('宮城県')).not.toBeChecked();
  });

  /**
   * テストケース: チェックボックスがクリックされたときにhandlePrefectureSelectionが呼び出されるか
   */
  it('handlePrefectureSelectionが呼び出されるか', () => {
    const handlePrefectureSelection = jest.fn();
    render(
      <PrefectureCheckboxList
        prefectures={mockPrefectures}
        checkedPrefectures={checkedPrefectures}
        handlePrefectureSelection={handlePrefectureSelection}
      />
    );

    const checkbox = screen.getByLabelText('岩手県');
    checkbox.click();

    expect(handlePrefectureSelection).toHaveBeenCalledTimes(1);
    expect(handlePrefectureSelection).toHaveBeenCalledWith({ prefCode: 3 });
  });

  /**
   * テストケース: チェックボックスがクリックされたときにhandlePrefectureSelectionが正しい引数で呼び出されるか
   */
  it('handlePrefectureSelectionが正しい引数で呼び出されるか', () => {
    const handlePrefectureSelection = jest.fn();
    render(
      <PrefectureCheckboxList
        prefectures={mockPrefectures}
        checkedPrefectures={checkedPrefectures}
        handlePrefectureSelection={handlePrefectureSelection}
      />
    );

    const checkbox = screen.getByLabelText('岩手県');
    checkbox.click();

    expect(handlePrefectureSelection).toHaveBeenCalledWith({ prefCode: 3 });
  });
});
