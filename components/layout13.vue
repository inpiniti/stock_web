<template>
  <DevOnly>
    <div
      class="absolute z-30 top-0 left-0 w-full h-full border-red-500 border text-red-500 pointer-events-none"
    >
      13
    </div>
  </DevOnly>
  <Card class="h-52 p-5">
    <ColCover>
      <Fix>
        <TypographyH4>Shipment trends</TypographyH4>
      </Fix>
      <Full>
        <Full>
          <MyBarChart />
        </Full>
      </Full>
    </ColCover>
  </Card>
</template>
