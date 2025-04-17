'use client';

import { JSX, useEffect, useState } from 'react';

import { useAtomValue } from 'jotai';
import { PopulationLabel } from '@/types/models/populationComp/PopulationLabel';
import { prefectureSelectionActionAtom } from '@/store/prefectureSelection/prefectureSelectionActionAtom';
import { PopulationCompByPrefCodes } from '@/types/models/populationComp/PopulationCompByPrefCodes';
import { BoundaryYears } from '@/types/models/populationComp/BoundaryYears';
import usePopulationComp from '@/hooks/populationComp/usePopulationComp';
import { PopulationCompResponse } from '@/types/models/populationComp/PopulationCompResponse';
import { Prefecture } from '@/types/models/prefecture/Prefecture';
import { YearlyPopulationData } from '@/types/models/populationComp/YearlyPopulationData';
import { ChartData, ChartOptions } from 'chart.js';
import ChartRender from './ChartRender';

/**
 * @description ChartPropsの型定義
 * @property {PopulationLabel} chartMode - チャートの表示モード
 * @property {Prefecture[]} prefectures - 都道府県の配列
 */
interface ChartProps {
  chartMode: PopulationLabel;
  prefectures: Prefecture[];
}

/**
 * @file Chart.tsx
 * @description チャートコンポーネント
 * @param {ChartProps} chartProps - チャートの表示モードと都道府県の配列
 * @returns {JSX.Element} - チャートコンポーネント
 *
 * @author @kmjak
 */
export default function Chart({ chartMode, prefectures }: ChartProps): JSX.Element {
  const prefectureSelectionAction = useAtomValue(prefectureSelectionActionAtom);
  const [populationByPrefCode, setPopulationByPrefCode] = useState<PopulationCompByPrefCodes>({});
  const [boundaryYears, setBoundaryYears] = useState<BoundaryYears>({});

  const { handleGetPopulationCompByPrefCode } = usePopulationComp();

  // prefectureSelectionActionが変更されたときをトリガーに実行
  useEffect(() => {
    // prefectureSelectionActionのprefCodeのデータを取得または削除する
    const updatePopulationData = async () => {
      // prefectureSelectionActionがundefinedの場合は何もしない
      if (prefectureSelectionAction === undefined) return;

      // prefectureSelectionActionからactionとprefCodeを取得
      const { action, prefCode } = prefectureSelectionAction;

      // actionまたはprefCodeがundefinedの場合は何もしない
      if (action === undefined || prefCode === undefined) return;

      if (action === 'insert') {
        // actionがinsertの場合は、都道府県コードを指定して人口構成データを取得
        const populationCompResponse: PopulationCompResponse | undefined =
          await handleGetPopulationCompByPrefCode({
            prefCode,
          });

        // populationCompResponseがundefinedの場合は何もしない
        if (populationCompResponse === undefined) return;

        // populationCompResponseからboundaryYearとpopulationCompを取得
        const { boundaryYear, data: populationCompData } = populationCompResponse;

        // boundaryYearとpopulationCompが存在する場合は、都道府県コードを指定してpopulationByPrefCodeとboundaryYearsに追加
        if (boundaryYear && populationCompData) {
          setBoundaryYears((prev) => ({ ...prev, [prefCode]: boundaryYear }));
          setPopulationByPrefCode((prev) => ({
            ...prev,
            [prefCode]: {
              total: populationCompData[0].data,
              young: populationCompData[1].data,
              working: populationCompData[2].data,
              elderly: populationCompData[3].data,
            },
          }));
        }
      } else if (action === 'delete') {
        // actionがdeleteの場合は、都道府県コードを指定してpopulationByPrefCodeとboundaryYearsから削除
        setPopulationByPrefCode((prev) => {
          const newPopulationByPrefCode = { ...prev };
          delete newPopulationByPrefCode[prefCode];
          return newPopulationByPrefCode;
        });
        setBoundaryYears((prev) => {
          const newBoundary = { ...prev };
          delete newBoundary[prefCode];
          return newBoundary;
        });
      }
    };

    updatePopulationData();
  }, [prefectureSelectionAction]);

  // labelsを定義
  const labels = Object.values(populationByPrefCode)[0]?.[chartMode]?.map(
    (populationCompItem: YearlyPopulationData) => populationCompItem.year
  );

  // chartDataを定義
  const chartData: ChartData<'line'> = {
    // 横軸のラベル
    labels,
    // 実際のデータ
    datasets: Object.entries(populationByPrefCode).map(([prefCodeStr, data]) => {
      const prefCode: number = parseInt(prefCodeStr, 10);
      const populationData: YearlyPopulationData[] = data[chartMode];
      const boundaryYear: number = boundaryYears[prefCode];

      return {
        label: prefectures.find((pref) => pref.prefCode === prefCode)?.prefName,
        data: populationData.map((populationComp: YearlyPopulationData) => populationComp.value),
        borderColor: `hsl(${(prefCode * 7) % 360}, 70%, 50%)`,
        backgroundColor: `hsla(${(prefCode * 7) % 360}, 70%, 50%, 0.5)`,
        pointRadius: populationData.map((populationComp: YearlyPopulationData) =>
          populationComp.year === boundaryYear ? 3 : 2
        ),
        pointBackgroundColor: populationData.map((populationComp: YearlyPopulationData) =>
          populationComp.year === boundaryYear ? 'white' : `hsl(${(prefCode * 7) % 360}, 70%, 50%)`
        ),
        pointBorderColor: populationData.map((populationComp: YearlyPopulationData) =>
          populationComp.year === boundaryYear ? `hsl(${(prefCode * 7) % 360}, 70%, 50%)` : 'white'
        ),
      };
    }),
  };

  // chartのオプションを定義
  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '都道府県別人口構成推移',
        font: {
          size: 15,
          weight: 'bold',
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: '年度',
        },
      },
      y: {
        title: {
          display: true,
          text: '人口',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mx-3 my-2 sm:my-3 md:my-4 lg:my-6">
      <ChartRender
        populationByPrefCode={populationByPrefCode}
        chartData={chartData}
        chartOptions={chartOptions}
      />
    </div>
  );
}
