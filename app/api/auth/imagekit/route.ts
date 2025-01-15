import config from '@/lib/config';
import ImageKit from 'imagekit';
import { NextResponse } from 'next/server';

const {
  env: {
    imageKit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

export async function GET() {
  const authParams = imagekit.getAuthenticationParameters();
  console.log('ImageKit Authentication Parameters:', authParams);

  return NextResponse.json(authParams);
}
