// src/app/api/orders/cash/route.ts

import { db } from '@/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { userId, configuration, amount } = await req.json()

  if (!userId || !configuration || !amount) {
    return new Response('Invalid request data', { status: 400 })
  }

  const newOrder = await db.order.create({
    data: {
      user: { connect: { id: userId } },
      configuration: {
        connect: { id: configuration.id },
      },
      amount, // Amount in paise
      isPaid: false,  // Cash payment is not processed immediately
      paymentMethod: 'cash',
    },
  })

  return NextResponse.json({ orderId: newOrder.id, ok: true })
}
