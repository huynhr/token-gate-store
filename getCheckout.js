import "dotenv/config";
import nodeFetch from "node-fetch";
global.fetch = nodeFetch;
import Client from "shopify-buy";

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
  domain: process.env.DOMAIN,
  storefrontAccessToken: process.env.ACCESS_TOKEN,
});

const run = async () => {
  try {
    const checkout = await client.checkout.fetch("");

    const {
      orderStatusUrl,
      note,
      ready,
      paymentDue,
      paymentDueV2,
      webUrl,
      completedAt,
    } = checkout;

    console.log({
      checkout,
      orderStatusUrl,
      note,
      ready,
      paymentDue,
      paymentDueV2,
      webUrl,
      completedAt,
    });
  } catch (error) {
    console.log({ error });
  }
};

run();
