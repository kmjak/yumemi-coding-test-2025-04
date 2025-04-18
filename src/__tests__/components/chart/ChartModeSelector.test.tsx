import ChartModeSelector from '@/components/chart/ChartModeSelector';
import { fireEvent, render, screen } from '@testing-library/react';

describe('ChartModeSelector', () => {
  /**
   * テストケース: ChartModeSelectorが正しくレンダリングされているか確認
   */
  it('正しくレンダリングされるか確認', () => {
    const setChartMode = jest.fn();
    render(<ChartModeSelector setChartMode={setChartMode} />);
    expect(screen.getByLabelText('モード選択')).toBeInTheDocument();
  });

  /**
   * テストケース: モードを選択した時にsetChartModeが押され、'working'が渡されるか確認
   */
  it('setChartModeが期待通りに動くか', () => {
    const setChartMode = jest.fn();
    render(<ChartModeSelector setChartMode={setChartMode} />);

    const select = screen.getByLabelText('モード選択');
    fireEvent.change(select, { target: { value: 'working' } });

    expect(setChartMode).toHaveBeenCalledWith('working');
  });
});
