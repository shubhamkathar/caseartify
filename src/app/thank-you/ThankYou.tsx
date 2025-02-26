// src/app/thank-you/ThankYou.tsx

'use client'

import { useQuery } from '@tanstack/react-query'
import { getPaymentStatus } from './actions'
import { useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import PhonePreview from '@/components/PhonePreview'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image' // Add image import
import { Button } from '@/components/ui/button' // If you want to add a button for navigation

const ThankYou = () => {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') || ''

  const { data } = useQuery({
    queryKey: ['get-payment-status'],
    queryFn: async () => await getPaymentStatus({ orderId }),
    retry: true,
    retryDelay: 500,
  })

  if (!data) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">Loading your order...</h3>
          <p>This won't take long.</p>
        </div>
      </div>
    )
  }

  const { configuration, billingAddress, shippingAddress, amount, isPaid } = data

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <p className="text-base font-medium text-primary">Thank you!</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Your case is on the way!
          </h1>
          <p className="mt-2 text-base text-zinc-500">
            {isPaid
              ? "We've received your payment and are now processing your order."
              : 'You have chosen cash on delivery. Please prepare the exact amount.'}
          </p>
        </div>

        {/* Image Section for Shop Location and QR */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            You can pick up your order from our shop!
          </h2>
          <div className="relative mb-6 inline-block">
            <Image
              src="/scanner.jpg"
              alt="Shop Location QR Code"
              width={300}
              height={300}
              className="rounded-lg shadow-lg border border-gray-300"
            />
          </div>
          <p className="text-base text-gray-700">
            Scan the QR code above or follow the shop's address to collect your order.
          </p>
        </div>

        {/* Button with Green Color */}
        <div className="mt-6 text-center">
          <Button
            onClick={() => window.location.href = '/'} // Add your homepage or other link
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ThankYou
