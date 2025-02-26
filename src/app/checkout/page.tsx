// src/app/checkout/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

interface Configuration {
  id: string;
  model: string;
  totalPrice: number; // Price will now be in rupees
}

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { user } = useKindeBrowserClient();

  const [configuration, setConfiguration] = useState<Configuration | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0); // Price in rupees

  useEffect(() => {
    const configData = JSON.parse(localStorage.getItem('configurationData') || 'null');

    if (configData) {
      setConfiguration(configData);
      setTotalPrice(configData.totalPrice || 0); // Use the stored price
    }
  }, []);

  const handleOrderSubmit = async () => {
    setLoading(true);

    try {
      if (!user || !user.id) {
        alert('You need to be logged in to place an order.');
        return;
      }

      if (!configuration) {
        alert('Configuration is missing.');
        return;
      }

      const userId = user.id;
      const configurationId = configuration.id;

      if (paymentMethod === 'cash') {
        const response = await fetch('/api/orders/cash', {
          method: 'POST',
          body: JSON.stringify({
            userId,
            configuration: { id: configurationId },
            amount: totalPrice,
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        if (result.ok) {
          router.push(`/thank-you?orderId=${result.orderId}`);
        } else {
          alert(result.error || 'Failed to place order. Please try again.');
        }
      } else if (paymentMethod === 'card') {
        alert('Card payment processing not implemented in this example.');
      }
    } catch (error) {
      console.error('Order submission error:', (error as Error).message);
      alert('An error occurred while processing your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <div>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={() => setPaymentMethod('card')}
          />
          Card Payment
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="cash"
            checked={paymentMethod === 'cash'}
            onChange={() => setPaymentMethod('cash')}
          />
          Cash Payment
        </label>
      </div>

      {configuration && (
        <div>
          <h3>Your {configuration.model} Case</h3>
          <p>Total Price: ₹{totalPrice.toFixed(2)}</p> {/* Displaying price in rupees */}
        </div>
      )}

      <button onClick={handleOrderSubmit} disabled={loading}>
        {loading ? 'Processing...' : 'Place Order'}
      </button>
    </div>
  );
};

export default Checkout;
