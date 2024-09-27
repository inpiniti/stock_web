<script setup lang="ts">
const { search } = useSelected();
const { live } = useLive();
</script>
<template>
  <DevOnly>
    <div
      class="absolute z-30 top-0 left-0 w-full h-full border-red-500 border text-red-500 pointer-events-none"
    >
      10
    </div>
  </DevOnly>
  <RowCover class="items-center gap-5 justify-between">
    <RowCover class="items-center gap-3">
      <Avatar class="border">
        <AvatarImage
          :src="`https://s3-symbol-logo.tradingview.com/${live.logoid}--big.svg`"
          alt="@radix-vue"
        />
        <AvatarFallback>{{ live.description?.slice(0, 2) }}</AvatarFallback>
      </Avatar>
      <TypographyH3>{{ live.logoid }} ({{ live.description }})</TypographyH3>
    </RowCover>
    <div class="shrink-0 relative">
      <Input
        placeholder="Search"
        class="pl-10 border-0 w-96"
        v-model="search"
      />
      <font-awesome class="absolute top-3 left-3" icon="magnifying-glass" />
    </div>
  </RowCover>
</template>
