<script setup lang="ts">
const {
  market,
  sector,
  sectors,
  sector_kr,
  isInterest,
  isLive,
  search,
  stockList,
} = useSelected();
const { live } = useLive();
const { model, models, predicts } = useAiModel();
const { user } = useSign();
const { userFavorites } = useUserFavorites();
</script>
<template>
  <DevOnly>
    <div class="w-full text-red-500 border border-red-500">
      <Accordion
        type="single"
        class="w-full"
        collapsible
        default-value="selected"
      >
        <AccordionItem key="selected" value="selected">
          <AccordionTrigger> useSelected </AccordionTrigger>
          <AccordionContent>
            market: {{ market }}, sector: {{ sector }}, sectors: {{ sectors }},
            sector_kr: {{ sector_kr }}, isInterest: {{ isInterest }}, isLive:
            {{ isLive }}, search: {{ search }}, stockList:
            {{ stockList }}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem key="model" value="model">
          <AccordionTrigger> useAiModel.model </AccordionTrigger>
          <AccordionContent>
            {{ model }}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem key="models" value="models">
          <AccordionTrigger> useAiModel.models </AccordionTrigger>
          <AccordionContent>
            {{ models }}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem key="user" value="user">
          <AccordionTrigger> user </AccordionTrigger>
          <AccordionContent>
            {{ user }}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem key="userFavorites" value="userFavorites">
          <AccordionTrigger> userFavorites </AccordionTrigger>
          <AccordionContent>
            {{ userFavorites }}
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
