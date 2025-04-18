'use client';

import { JSX, useState } from 'react';
import Chart from './Chart';
import ChartModeSelector from './ChartModeSelector';
import { PopulationLabel } from '@/types/models/populationComp/PopulationLabel';
import { Prefecture } from '@/types/models/prefecture/Prefecture';

/**
 * @description ChartContainerPropsの型定義
 * @property {Prefecture[]} prefectures - 都道府県の配列
 */
interface ChartContainerProps {
  prefectures: Prefecture[];
}

/**
 * @file ChartContainer.tsx
 * @description チャートコンポーネントのコンテナ
 * @param {ChartContainerProps} props - 都道府県の配列
 * @returns {JSX.Element} - チャートコンポーネントのコンテナ
 *
 * @author @kmjak
 */
export default function ChartContainer({ prefectures }: ChartContainerProps): JSX.Element {
  const [chartMode, setChartMode] = useState<PopulationLabel>('total');

  return (
    <section className="my-2">
      <ChartModeSelector setChartMode={setChartMode} />
      <Chart chartMode={chartMode} prefectures={prefectures} />
    </section>
  );
}
