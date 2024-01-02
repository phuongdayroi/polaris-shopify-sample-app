
export type VolumnDiscountRuleOption = {
  title: string;
  subtitle: string;
  label?: string;
  quantity: number;
  discountType: string;
  amount: number;
};

export type VolumnDiscountRule = {
  campaign: string;
  title: string;
  description: string;
  options: VolumnDiscountRuleOption[];
};
