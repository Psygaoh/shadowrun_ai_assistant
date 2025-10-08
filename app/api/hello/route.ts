import { NextResponse } from 'next/server';
import { getHelloMessage } from '../../../lib/hello';

export async function GET() {
  const message = await getHelloMessage();
  return NextResponse.json({ message });
}
