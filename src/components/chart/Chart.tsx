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
import { PopulationDataByLabel } from '@/types/models/populationComp/PopulationDataByLabel';

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
      const { action, prefCode, prefCodes } = prefectureSelectionAction;

      // actionがundefinedの場合は何もしない
      if (action === undefined) return;

      if (action === 'insert') {
        // prefCodeがundefinedの場合は何もしない
        if (prefCode === undefined) return;

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
          // boundaryYearsにboundaryYearを追加
          setBoundaryYears((prev) => ({ ...prev, [prefCode]: boundaryYear }));

          // populationByPrefCodeにラベルごとの人口構成データを追加
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

        // prefCodeがundefinedの場合は何もしない
        if (prefCode === undefined) return;

        // populationByPrefCodeからprefCodeを削除
        setPopulationByPrefCode((prev) => {
          const newPopulationByPrefCode = { ...prev };
          delete newPopulationByPrefCode[prefCode];
          return newPopulationByPrefCode;
        });

        // boundaryYearsからprefCodeを削除
        setBoundaryYears((prev) => {
          const newBoundary = { ...prev };
          delete newBoundary[prefCode];
          return newBoundary;
        });
      } else if (action === 'deleteAll') {
        // actionがdeleteAllの場合は、全ての都道府県コードを指定してpopulationByPrefCodeとboundaryYearsから削除
        setPopulationByPrefCode({});
        setBoundaryYears({});
      } else if (action === 'insertList') {
        // actionがinsertListの場合は、都道府県コードを指定してpopulationByPrefCodeとboundaryYearsに追加

        // prefCodesがundefinedの場合は何もしない
        if (prefCodes === undefined) return;

        // populationByPrefCodeとboundaryYearsをPrefCodesの数だけ取得
        await Promise.all(
          prefCodes.map(async (prefCode) => {
            // actionがinsertListの場合は、都道府県コードを指定して人口構成データを取得
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
              // boundaryYearsにboundaryYearを追加
              setBoundaryYears((prev) => ({ ...prev, [prefCode]: boundaryYear }));

              // populationByPrefCodeにラベルごとの人口構成データを追加
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
          })
        );
      }
    };

    updatePopulationData();
  }, [prefectureSelectionAction]);

  // labelsを定義
  const yearArrays: number[][] = Object.values(populationByPrefCode).map(
    (population: PopulationDataByLabel) => population[chartMode]?.map((data) => data.year) ?? []
  );

  const commonYears: number[] =
    yearArrays.length === 0
      ? []
      : yearArrays.reduce((acc, years) => acc.filter((year) => years.includes(year)));

  // labelを昇順にする
  const labels: number[] = commonYears.sort((a, b) => a - b);

  // chartDataを定義
  const chartData: ChartData<'line'> = {
    // 横軸のラベル
    labels,
    // 実際のデータ
    datasets: Object.entries(populationByPrefCode).map(([prefCodeStr, populationByPrefecture]) => {
      const prefCode: number = parseInt(prefCodeStr, 10);
      const populationByMode: YearlyPopulationData[] = populationByPrefecture[chartMode];
      const boundaryYear: number = boundaryYears[prefCode];
      const populationByYear: Map<number, number> = new Map(
        populationByMode.map((population) => [population.year, population.value])
      );

      return {
        label: prefectures.find((pref) => pref.prefCode === prefCode)?.prefName,
        data: labels.map((year) => populationByYear.get(year) ?? null),
        borderColor: `hsl(${(prefCode * 7) % 360}, 70%, 50%)`,
        backgroundColor: `hsla(${(prefCode * 7) % 360}, 70%, 50%, 0.5)`,
        pointRadius: labels.map((year) => (year === boundaryYear ? 3 : 2)),
        pointBackgroundColor: labels.map((year) =>
          year === boundaryYear ? 'white' : `hsl(${(prefCode * 7) % 360}, 70%, 50%)`
        ),
        pointBorderColor: labels.map((year) =>
          year === boundaryYear ? `hsl(${(prefCode * 7) % 360}, 70%, 50%)` : 'white'
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
