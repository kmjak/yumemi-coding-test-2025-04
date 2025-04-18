import ChartContainer from '@/components/chart/ChartContainer';
import PrefectureSelector from '@/components/prefectureSelector/PrefectureSelector';
import { Prefecture } from '@/types/models/prefecture/Prefecture';
import getPrefectures from '@/usecases/prefecture/getPrefectures';

export default async function Home() {
  try {
    const prefectures: Prefecture[] = await getPrefectures();
    return (
      <main>
        <PrefectureSelector prefectures={prefectures} />
        <ChartContainer prefectures={prefectures} />
      </main>
    );
  } catch (error) {
    if (error instanceof Error) {
      return (
        <main>
          <h1>都道府県情報の取得に失敗しました</h1>
          <p>{error.message}</p>
        </main>
      );
    } else {
      throw new Error('Unknown error');
    }
  }
}
