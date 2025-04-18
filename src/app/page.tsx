import ChartContainer from '@/components/chart/ChartContainer';
import PrefectureSelector from '@/components/prefectureSelector/PrefectureSelector';
import { Prefecture } from '@/types/models/prefecture/Prefecture';
import getPrefectures from '@/usecases/prefecture/getPrefectures';

export default async function Home() {
  let conf;
  try {
    const res = await fetch('http://localhost:3000/api/debug', {
      method: 'GET',
      cache: 'no-store',
    });

    conf = await res.json();

    const prefectures: Prefecture[] = await getPrefectures();
    return (
      <main>
        <PrefectureSelector prefectures={prefectures} />
        <ChartContainer prefectures={prefectures} />
      </main>
    );
  } catch (error) {
    if (error instanceof Error) {
      // throw error;
      return (
        <main>
          <h1>エラーが発生しました</h1>
          <p>{error.message}</p>
          {conf && (
            <div>
              <h2>デバッグ情報</h2>
              <pre>{JSON.stringify(conf, null, 2)}</pre>
            </div>
          )}
        </main>
      );
    } else {
      throw new Error('Unknown error');
    }
  }
}
