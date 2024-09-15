<script setup lang="ts">
const { market, sector, sector_kr, isInterest, isLive, search, stockList } =
  useSelected();
const { live } = useLive();
const { predicts } = useAiModel();
</script>
<template>
  <DevOnly>
    <div class="w-full border-red-500 border text-red-500">
      <Accordion
        type="single"
        class="w-full"
        collapsible
        default-value="selected"
      >
        <AccordionItem key="selected" value="selected">
          <AccordionTrigger> useSelected </AccordionTrigger>
          <AccordionContent>
            {{ market }}, sector: {{ sector }}, sector_kr: {{ sector_kr }},
            isInterest: {{ isInterest }}, isLive: {{ isLive }}, search:
            {{ search }}, stockList:
            {{ stockList }}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem key="live" value="live">
          <AccordionTrigger> live </AccordionTrigger>
          <AccordionContent>
            <div v-for="(value, key) in live" :key="key">
              <span class="font-bold">{{ key }}:</span> <span>{{ value }}</span>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem key="predicts" value="predicts">
          <AccordionTrigger> predicts </AccordionTrigger>
          <AccordionContent>
            <div v-if="predicts && predicts.length > 0">
              <div v-for="(predict, index) in predicts" :key="index">
                <span class="font-bold">Prediction {{ predict.ago }}:</span>
                <span>{{ (predict.predict * 100).toFixed(2) }}%</span>
              </div>
            </div>
            <div v-else>No predictions available.</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </DevOnly>
</template>
