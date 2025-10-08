import { NextResponse } from 'next/server';
import { getHelloMessage } from '../../../lib/hello';

export async function GET() {
  const message = getHelloMessage();
  return NextResponse.json({ message });
}
