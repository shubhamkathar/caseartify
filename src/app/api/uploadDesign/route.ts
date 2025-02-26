// src/app/api/uploadDesign/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';

export async function POST(req: NextRequest) {
  try {
    const { title, imageUrl } = await req.json();

    // Save design to the database
    const design = await db.design.create({
      data: {
        title,
        imageUrl,
      },
    });

    return NextResponse.json(design, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error uploading design' }, { status: 500 });
  }
}
