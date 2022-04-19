import "dotenv/config";
import nodeFetch from "node-fetch";
global.fetch = nodeFetch;
import Client from "shopify-buy/index.unoptimized.umd.min.js";

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
  // domain: "your-shop-name.myshopify.com",
  // storefrontAccessToken: "your-storefront-access-token",
  domain: process.env.DOMAIN,
  storefrontAccessToken: process.env.ACCESS_TOKEN,
});

const run = async () => {
  const startTimer = new Date();
  try {
    // const products = await client.product.fetchAll();
    // const variantId = products[0].variants[0].id;

    // const checkout = await client.checkout.create();

    const checkouts = [];

    for (let i = 0; i < 10; i++) {
      checkouts.push(client.checkout.create());
      console.log(i + 1);
    }

    const resolved = await Promise.all(checkouts);

    console.log({ resolved });

    // console.log({ resolved: resolved.map((item) => item.id) });

    // const checkoutId = checkout.id;

    // const lineItems = [
    //   {
    //     variantId: variantId,
    //     quantity: 1,
    //   },
    // ];

    // const checkoutWithItems = await client.checkout.addLineItems(
    //   checkoutId,
    //   lineItems
    // );

    // console.log({ checkoutWithItems: checkoutWithItems.webUrl, checkoutId });
  } catch (error) {
    console.log({ error });
  } finally {
    const endTimer = new Date();
    console.log("runtime: ", (+endTimer - +startTimer) / 1000, "s");
  }
};

run();
