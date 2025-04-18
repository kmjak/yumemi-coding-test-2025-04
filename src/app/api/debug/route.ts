// app/api/example/route.ts

import { apiConf } from '@/conf/api/apiConf';
import { apiPath } from '@/conf/api/apiPath';
import { NextResponse } from 'next/server';

export async function GET() {
  const API_CONF = apiConf;
  const API_PATH = apiPath;

  return NextResponse.json(
    {
      apiConf: API_CONF,
      apiPath: API_PATH,
    },
    { status: 200 }
  );
}
