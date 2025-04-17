'use client';

import React, { JSX } from 'react';
import { PopulationLabel } from '@/types/models/populationComp/PopulationLabel';
import Label from '@/components/ui/Label';

/**
 * @description ChartModeSelectorPropsの型定義
 * @property {React.Dispatch<React.SetStateAction<PopulationLabel>>} setChartMode - チャートの表示モードを更新する関数
 */
interface ChartModeSelectorProps {
  setChartMode: React.Dispatch<React.SetStateAction<PopulationLabel>>;
}

/**
 * @file ChartModeSelector.tsx
 * @description チャートの表示モードを選択するセレクターコンポーネント
 * @param {ChartModeSelectorProps} props - チャートの表示モードを更新する関数
 * @returns {JSX.Element} - チャートの表示モードを選択するセレクターコンポーネント
 *
 * @author @kmjak
 */
export default function ChartModeSelector({ setChartMode }: ChartModeSelectorProps): JSX.Element {
  /**
   * @description chartModeを変更する関数
   * @param {React.ChangeEvent<HTMLSelectElement>} event
   * @returns {void}
   */
  const handleChangeMode = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedMode = event.target.value;
    if (['total', 'young', 'working', 'elderly'].includes(selectedMode)) {
      const mode: PopulationLabel = selectedMode as PopulationLabel;
      setChartMode(mode);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Label htmlFor="chartMode" className="mr-2">
        モード選択
      </Label>
      <select
        id="chartMode"
        onChange={handleChangeMode}
        className="outline-none border border-gray-300 rounded p-1 md:p-2 text-sm sm:text-base lg:text-lg"
      >
        <option value="total">総人口</option>
        <option value="young">年少人口</option>
        <option value="working">生産年齢人口</option>
        <option value="elderly">老年人口</option>
      </select>
    </div>
  );
}
