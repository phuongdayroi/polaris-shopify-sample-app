import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { authenticate } from "../shopify.server";

import { VolumnDiscountRuleContainer } from "~/components/VolumnDiscountRuleContainer";
import type {
  VolumnDiscountRule,
  VolumnDiscountRuleOption,
} from "~/models/volumn-discount-rule.model";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const defaultDiscountRule = {
    campaign: "",
    description: "",
    options: [
      {
        discountType: "None",
        quantity: 1,
        subtitle: "Standard price",
        title: "Single",
        label: "",
        amount: 0,
      },
      {
        discountType: "% discount",
        quantity: 2,
        subtitle: "Save 10%",
        title: "Duo",
        label: "Popular",
        amount: 10,
      },
    ] as VolumnDiscountRuleOption[],
    title: "",
  } as VolumnDiscountRule;
  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <VolumnDiscountRuleContainer
        data={defaultDiscountRule}
      ></VolumnDiscountRuleContainer>
    </AppProvider>
  );
}
