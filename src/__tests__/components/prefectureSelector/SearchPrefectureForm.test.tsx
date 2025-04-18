import { render, screen } from '@testing-library/react';
import SearchPrefectureForm from '@/components/prefectureSelector/SearchPrefectureForm';
import { Prefecture } from '@/types/models/prefecture/Prefecture';

const mockPrefectures: Prefecture[] = [
  { prefCode: 1, prefName: '北海道' },
  { prefCode: 2, prefName: '青森県' },
  { prefCode: 3, prefName: '岩手県' },
  { prefCode: 4, prefName: '宮城県' },
];

/**
 * @file SearchPrefectureForm.test.tsx
 * @description SearchPrefectureFormコンポーネントのテスト
 * @see src/components/prefectureSelector/SearchPrefectureForm
 *
 * @author @kmjak
 */
describe('SearchPrefectureForm', () => {
  /**
   * テストケース: SearchPrefectureFormコンポーネントが正しくレンダリングされるか
   */
  it('正しくレンダリングされているか', () => {
    render(
      <SearchPrefectureForm prefectures={mockPrefectures} handlePrefectureSelection={() => {}} />
    );
    expect(screen.getByPlaceholderText('都道府県名を入力')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '切り替え' })).toBeInTheDocument();
  });
});
