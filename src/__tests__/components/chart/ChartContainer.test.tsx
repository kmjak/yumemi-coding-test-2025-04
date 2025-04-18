import { render, screen } from '@testing-library/react';
import ChartContainer from '@/components/chart/ChartContainer';
import { Prefecture } from '@/types/models/prefecture/Prefecture';

jest.mock('@/components/chart/Chart', () => {
  return function MockChart() {
    return <div data-testid="chart" />;
  };
});
jest.mock('@/components/chart/ChartModeSelector', () => {
  return function MockChartModeSelector() {
    return <div data-testid="chart-mode-selector" />;
  };
});

const mockPrefectures: Prefecture[] = [
  { prefCode: 1, prefName: '北海道' },
  { prefCode: 2, prefName: '青森県' },
];

/**
 * @file ChartContainer.test.tsx
 * @description ChartContainerコンポーネントのテスト
 * @see src/components/chartChartContainer.tsx
 *
 * @author @kmjak
 */
describe('ChartContainer', () => {
  /**
   * テストケース: ChartModeSelectorとChartが正しくレンダリングされているか確認
   */
  it('ChartModeSelectorとChartが正しくレンダリングされているか確認', () => {
    render(<ChartContainer prefectures={mockPrefectures} />);

    // ChartModeSelectorとChartが正しくレンダリングされているか確認
    expect(screen.getByTestId('chart-mode-selector')).toBeInTheDocument();
    expect(screen.getByTestId('chart')).toBeInTheDocument();
  });
});
