import {
  Badge,
  FormLayout,
  LegacyCard,
  Select,
  TextField,
} from "@shopify/polaris";
import { useState } from "react";
import { VolumnDiscountRuleConstant } from "~/constants/volumn-discount-rule.constant";
import type { VolumnDiscountRuleOption } from "~/models/volumn-discount-rule.model";

export function VolumnDiscountRuleOption({
  data,
  id,
  onDelete,
  onValueChange,
}: {
  data: VolumnDiscountRuleOption;
  id: number;
  onDelete: () => void;
  onValueChange: (data: VolumnDiscountRuleOption) => void;
}) {
  const [item, setItem] = useState(data);

  function updateItem(value: VolumnDiscountRuleOption) {
    setItem(value);
    onValueChange(value);
  }
  return (
    <LegacyCard>
      <LegacyCard.Section>
        <Badge tone="critical">{`OPTION ${id}`}</Badge>
      </LegacyCard.Section>
      <LegacyCard.Section
        actions={[
          {
            content: "Delete",
            destructive: true,
            onAction() {
              onDelete();
            },
          },
        ]}
      ></LegacyCard.Section>
      <LegacyCard.Section>
        <FormLayout>
          <FormLayout.Group condensed>
            <TextField
              label="Title"
              onChange={(value) => {
                updateItem({ ...item, title: value });
              }}
              error={!item.title || item.title.length === 0}
              value={item.title}
              autoComplete="off"
            />
            <TextField
              label="Subtitle"
              onChange={(value) => {
                updateItem({ ...item, subtitle: value });
              }}
              value={item.subtitle}
              autoComplete="off"
            />
            <TextField
              label="Label (optional)"
              onChange={(value) => {
                updateItem({ ...item, label: value });
              }}
              value={item.label}
              autoComplete="off"
            />
          </FormLayout.Group>
          <FormLayout.Group condensed>
            <TextField
              label="Quantity"
              type="number"
              min={0}
              error={item.quantity === null}
              onChange={(value: any) => {
                updateItem({ ...item, quantity: value });
              }}
              value={`${item.quantity ?? 0}`}
              autoComplete="off"
            />

            <Select
              onChange={(value: any) => {
                updateItem({ ...item, discountType: value });
              }}
              options={VolumnDiscountRuleConstant.DiscountTypes ?? []}
              label="Discount type"
              value={item.discountType}
              placeholder="Discount type"
            />
            <>
              {item.discountType !== "None" && (
                <TextField
                  label="Amount"
                  type="number"
                  min={0}
                  suffix={
                    item.discountType === "% discount"
                      ? "%"
                      : item.discountType === "% discount"
                        ? "$"
                        : ""
                  }
                  error={item.amount === null}
                  onChange={(value: any) => {
                    updateItem({ ...item, amount: value });
                  }}
                  value={`${item.amount ?? 0}`}
                  autoComplete="off"
                />
              )}
            </>
          </FormLayout.Group>
        </FormLayout>
      </LegacyCard.Section>
    </LegacyCard>
  );
}
