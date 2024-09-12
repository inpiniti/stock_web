<template>
  <DevOnly>
    <div
      class="absolute z-30 top-0 left-0 w-full h-full border-red-500 border text-red-500 pointer-events-none"
    >
      10
    </div>
  </DevOnly>
  <RowCover class="items-center gap-5 justify-between">
    <TypographyH3>Apple</TypographyH3>
    <div class="shrink-0 relative w-full">
      <Input placeholder="Search" class="pl-10 border-0" />
      <font-awesome class="absolute top-3 left-3" icon="magnifying-glass" />
    </div>
  </RowCover>
</template>
