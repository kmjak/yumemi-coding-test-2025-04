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
      // エラーがErrorインスタンスの場合は、そのままエラーメッセージを返す
      return <div>{error.message}</div>;
    } else {
      // エラーがErrorインスタンスでない場合は、Unknown errorを返す
      return <div>Unknown error</div>;
    }
  }
}
