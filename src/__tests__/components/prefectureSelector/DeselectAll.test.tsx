import { render, screen } from '@testing-library/react';
import DeselectAll from '@/components/prefectureSelector/DeselectAll';

/**
 * @file DeselectAll.test.tsx
 * @description DeselectAllコンポーネントのテスト
 * @see src/components/prefectureSelector/DeselectAll
 *
 * @author @kmjak
 */
describe('DeselectAll', () => {
  /**
   * テストケース: DeselectAllコンポーネントが正しくレンダリングされるか
   */
  it('DeselectAllコンポーネントが正しくレンダリングされるか', () => {
    render(<DeselectAll handleDeselectAllPrefCodes={() => {}} />);
    expect(screen.getByText('選択解除')).toBeInTheDocument();
  });

  /**
   * テストケース: ボタンがクリックされたときにhandleDeselectAllPrefCodesが呼び出されるか
   */
  it('ボタンがクリックされたときにhandleDeselectAllPrefCodesが呼び出されるか', () => {
    const handleDeselectAllPrefCodes = jest.fn();
    render(<DeselectAll handleDeselectAllPrefCodes={handleDeselectAllPrefCodes} />);

    const button = screen.getByText('選択解除');
    button.click();

    expect(handleDeselectAllPrefCodes).toHaveBeenCalledTimes(1);
  });
});
