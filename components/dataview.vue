<script setup lang="ts">
const { market, sector, sector_kr, isInterest, isLive, search, stockList } =
  useSelected();
const { live } = useLive();
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
      </Accordion>
    </div>
  </DevOnly>
</template>
