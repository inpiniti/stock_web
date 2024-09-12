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
        <TypographyH3 class="text-white">Line Chart</TypographyH3>
      </Fix>
      <Full>
        <RowCover>
          <Fix>
            <TypographyH1 class="text-white">96%</TypographyH1>
          </Fix>
          <Full>
            <MyLineChart />
          </Full>
        </RowCover>
      </Full>
      <Fix>
        <p class="text-white">Send the best route to the driver's email</p>
      </Fix>
    </ColCover>
  </Card>
</template>
