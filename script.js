const stripe = Stripe('YOUR_STRIPE_PUBLISHABLE_KEY');
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

const form = document.getElementById('payment-form');
const resultDiv = document.getElementById('payment-result');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = document.getElementById('amount').value;

    try {
        const response = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount })
        });
        const { clientSecret } = await response.json();

        const result = await stripe.confirmCardPayment /*esawa khalti,etc*/
            (clientSecret, {
                payment_method: { card: cardElement }
            });

        if (result.error) {
            resultDiv.textContent = result.error.message;
        } else {
            resultDiv.textContent = 'Payment successful!';
        }
    } catch (error) {
        resultDiv.textContent = error.message;
    }
});