<template>
  <DevOnly>
    <div
      class="absolute z-30 top-0 left-0 w-full h-full border-red-500 border text-red-500 pointer-events-none"
    >
      14
    </div>
  </DevOnly>
  <Card class="h-52 bg-primary p-5">
    <ColCover>
      <Fix>
        <TypographyH4 class="text-white">Route efficiency</TypographyH4>
      </Fix>
      <Full>
        <RowCover>
          <Fix>
            <TypographyP class="text-white text-4xl font-bold">96%</TypographyP>
          </Fix>
          <Full>
            <MyLineChart />
          </Full>
        </RowCover>
      </Full>
      <Fix>
        <p class="text-white text-xs">
          Send the best route to the driver's email
        </p>
      </Fix>
    </ColCover>
  </Card>
</template>
