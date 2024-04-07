import { Client, Environment } from "square";

const client = new Client({
    environment: Environment.Sandbox,
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

export const createPayment = async (body) => {
    const { amount, email, title, buyer_email } = body;

    const { checkoutApi } = client;

    try {
        const requestBody = {
            idempotencyKey: `${Date.now()}`,
            quickPay: {
                name: title,
                priceMoney: {
                    amount: amount,
                    currency: 'USD'
                },
                locationId: process.env.LOCATION_ID
            },
            checkoutOptions: {
                askForShippingAddress: true,
                merchantSupportEmail: email,
            },
            prePopulatedData: {
                buyerEmail: buyer_email
            }
        };

        const { result } = await checkoutApi.createPaymentLink(
            requestBody
        )

        return result;
    } catch (error) {
        console.error(error)
    }
}