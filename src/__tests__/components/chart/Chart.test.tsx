import { render, screen } from '@testing-library/react';
import Chart from '@/components/chart/Chart';
import { Prefecture } from '@/types/models/prefecture/Prefecture';

/**
 * @file Chart.test.tsx
 * @description Chartコンポーネントのテストコード
 * @see src/components/chart/Chart.tsx
 *
 * @author @kmjak
 */

const mockPrefectures: Prefecture[] = [
  { prefCode: 1, prefName: '北海道' },
  { prefCode: 2, prefName: '青森県' },
];

describe('Chart', () => {
  it('Chartコンポーネントが正しくレンダリングされる', () => {
    render(<Chart chartMode="total" prefectures={mockPrefectures} />);

    // チャートが正しくレンダリングされているか確認
    expect(screen.getByText('都道府県を選択してください')).toBeInTheDocument();
  });
});
