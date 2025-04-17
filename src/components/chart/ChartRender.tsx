'use client';

import { JSX } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
  Legend,
  Title,
  Tooltip,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { PopulationCompByPrefCodes } from '@/types/models/populationComp/PopulationCompByPrefCodes';

// Chart.jsの要素を登録
ChartJS.register(LinearScale, CategoryScale, LineElement, PointElement, Legend, Title, Tooltip);

/**
 * @description ChartRenderPropsの型定義
 * @property {PopulationCompByPrefCodes} populationByPrefCode - 都道府県コードと人口構成データのマッピング
 * @property {ChartData<'line'>} chartData - チャートのデータ
 * @property {ChartOptions<'line'>} chartOptions - チャートのオプション
 */
interface ChartRenderProps {
  populationByPrefCode: PopulationCompByPrefCodes;
  chartData: ChartData<'line'>;
  chartOptions: ChartOptions<'line'>;
}

/**
 * @file ChartRender.tsx
 * @description チャートを描画するコンポーネント
 * @param {ChartRenderProps} props - チャートのデータとオプション
 * @returns {JSX.Element} - チャートを描画するコンポーネント
 *
 * @author @kmjak
 */
export default function ChartRender({
  populationByPrefCode,
  chartData,
  chartOptions,
}: ChartRenderProps): JSX.Element {
  // populationByPrefCodeが空の場合は、何も表示しない
  if (Object.keys(populationByPrefCode).length === 0) {
    return (
      <div className="mx-3 my-2 sm:my-3 md:my-4 lg:my-6">
        <div className="max-w-5xl h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] border border-gray-300 rounded-lg shadow-md p-2 md:p-4 mx-auto flex items-center justify-center">
          <p className="text-gray-200">都道府県を選択してください</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] border border-gray-300 rounded-lg shadow-md p-2 md:p-4 mx-auto">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}
