// src/app/api/design/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';

export async function GET(req: NextRequest) {
  try {
    const designs = await db.design.findMany(); // Fetch all designs
    return NextResponse.json(designs);
  } catch (error) {
    console.error("Error fetching designs:", error);
    return NextResponse.json({ error: 'Error fetching designs' }, { status: 500 });
  }
}
