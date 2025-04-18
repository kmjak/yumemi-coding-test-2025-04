import { render, screen } from '@testing-library/react';
import ChartRender from '@/components/chart/ChartRender';
import { ChartData, ChartOptions } from 'chart.js';
import { PopulationCompByPrefCodes } from '@/types/models/populationComp/PopulationCompByPrefCodes';

jest.mock('react-chartjs-2', () => ({
  Line: () => <canvas data-testid="chart-canvas" />,
}));

/**
 * @file ChartRender.test.tsx
 * @description ChartRenderコンポーネントのテスト
 * @see src/components/chart/ChartRender.tsx
 *
 * @author @kmjak
 */
describe('ChartRender', () => {
  const chartData: ChartData<'line'> = {
    labels: [2000, 2005],
    datasets: [
      {
        label: 'Test Prefecture',
        data: [100, 200],
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  /**
   * テストケース: 都道府県が未選択の場合、都道府県を選択してくださいと表示される
   */
  it('都道府県が未選択のとき、メッセージが表示される', () => {
    render(
      <ChartRender populationByPrefCode={{}} chartData={chartData} chartOptions={chartOptions} />
    );

    expect(screen.getByText('都道府県を選択してください')).toBeInTheDocument();
  });

  /**
   * テストケース: populationByPrefCodeにデータがある場合、チャートが表示される
   */
  it('populationByPrefCode にデータがある場合、チャートが表示される', () => {
    const mockPopulationByPrefCode: PopulationCompByPrefCodes = {
      1: {
        total: [
          { year: 2000, value: 100 },
          { year: 2005, value: 200 },
        ],
        young: [],
        working: [],
        elderly: [],
      },
    };

    render(
      <ChartRender
        populationByPrefCode={mockPopulationByPrefCode}
        chartData={chartData}
        chartOptions={chartOptions}
      />
    );

    expect(screen.getByTestId('chart-canvas')).toBeInTheDocument();
  });
});
