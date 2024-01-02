/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Page,
  Layout,
  LegacyCard,
  FormLayout,
  TextField,
  Button,
  Card,
} from "@shopify/polaris";
import type { VolumnDiscountRule } from "~/models/volumn-discount-rule.model";
import { VolumnDiscountRuleOption } from "./VolumnDiscountRuleOption";
import { useState } from "react";
import { VolumnDiscountRuleReview } from "./VolumnDiscountRuleReview";

export function VolumnDiscountRuleContainer({
  data,
}: {
  data: VolumnDiscountRule;
}) {
  const [options, setOptions] = useState(data.options ?? []);
  const [campaign, setCampaign] = useState(data.campaign ?? "");
  const [description, setDescription] = useState(data.description ?? "");
  const [title, setTitle] = useState(data.title ?? "");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const listItems = options.map((item, index) => (
    // eslint-disable-next-line react/jsx-key
    <LegacyCard.Section>
      <VolumnDiscountRuleOption
        data={item}
        id={index + 1}
        onDelete={() => {
          let list = [...options];
          list.splice(index, 1);
          setOptions(list);
        }}
        onValueChange={(data) => {
          let list = [...options];
          list.splice(index, 1, data);
          setOptions(list);
          console.log(options);
        }}
      ></VolumnDiscountRuleOption>
    </LegacyCard.Section>
  ));

  return (
    <Page
      fullWidth
      backAction={{ content: "", url: "#" }}
      title="Create volumn discount"
    >
      <Layout>
        <Layout.Section>
          <Layout>
            <Layout.Section>
              <LegacyCard title="General" sectioned>
                <LegacyCard.Section>
                  <FormLayout>
                    <FormLayout.Group>
                      <TextField
                        label="Campaign"
                        error={!campaign || campaign.length === 0}
                        value={campaign}
                        onChange={setCampaign}
                        autoComplete="off"
                      />
                      <TextField
                        label="Title"
                        value={title}
                        onChange={setTitle}
                        autoComplete="off"
                      />
                      <TextField
                        label="Description"
                        value={description}
                        onChange={setDescription}
                        autoComplete="off"
                      />
                    </FormLayout.Group>
                  </FormLayout>
                </LegacyCard.Section>
              </LegacyCard>
            </Layout.Section>
            <Layout.Section>
              <LegacyCard title="Volumn discount" sectioned>
                <LegacyCard.Section>{listItems}</LegacyCard.Section>

                <LegacyCard.Section>
                  <Button
                    fullWidth
                    tone="critical"
                    onClick={() => {
                      setOptions([
                        ...options,
                        {
                          discountType: "None",
                          quantity: 0,
                          subtitle: "",
                          title: "",
                          amount: 0,
                        },
                      ]);

                      console.debug(options);
                    }}
                  >
                    Add option
                  </Button>
                </LegacyCard.Section>
              </LegacyCard>
            </Layout.Section>
          </Layout>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <LegacyCard title="Preview" sectioned>
            <LegacyCard.Section>
              <LegacyCard title="Buy more and save" sectioned>
                <p>Apply for all products in store.</p>
              </LegacyCard>
            </LegacyCard.Section>
            <LegacyCard.Section>
              <VolumnDiscountRuleReview
                list={options ?? []}
              ></VolumnDiscountRuleReview>
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
