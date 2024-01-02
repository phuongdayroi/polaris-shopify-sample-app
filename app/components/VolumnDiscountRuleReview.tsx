/* eslint-disable @typescript-eslint/no-unused-vars */
import { DataTable } from "@shopify/polaris";

import type { VolumnDiscountRuleOption } from "~/models/volumn-discount-rule.model";

export function VolumnDiscountRuleReview({
  list,
}: {
  list: VolumnDiscountRuleOption[];
}) {
  const rows = list.map((item) => toRow(item));
  function toRow(data: VolumnDiscountRuleOption) {
    return [
      data.title,
      data.discountType,
      data.quantity,
      data.discountType === "% discount"
        ? `${data.amount} %`
        : data.discountType === "Discount /each"
          ? `${data.amount} $`
          : ``,
    ];
  }

  return (
    <DataTable
      columnContentTypes={["text", "text", "numeric", "text"]}
      headings={["Campaign", "Discount Type", "Quantity", "Amount"]}
      rows={rows}
    />
  );
}
