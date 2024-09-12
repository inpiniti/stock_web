<template>
  <DevOnly>
    <div
      class="absolute z-30 top-0 left-0 w-full h-full border-red-500 border text-red-500"
    >
      11
    </div>
  </DevOnly>
  <Card class="relative bg-opacity-50 overflow-hidden h-full p-5">
    <video
      autoplay
      muted
      loop
      class="absolute top-0 left-0 inset-0 w-full h-full object-cover"
    >
      <source src="/bgvideo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <!-- 반투명한 검정색 오버레이 -->
    <div
      class="absolute top-0 left-0 inset-0 w-full h-full bg-white opacity-50 z-10"
    ></div>
    <!-- 카드 내용 -->
    <ColCover class="relative z-20 text-white gap-5">
      <Fix>
        <RowCover class="gap-3 text-2xl">
          <Button class="w-fit">코스피</Button>
          <Button variant="outline" class="w-fit text-primary border-red-500">
            코스피
          </Button>
          <Button variant="outline" class="w-fit text-primary border-red-500">
            코스피
          </Button>
        </RowCover>
      </Fix>
      <Fix>
        <div class="backdrop-blur-xl rounded-lg p-3 w-fit text-black">
          <ColCover>
            <TypographySmall>Distance to arrival:</TypographySmall>
            <RowCover class="items-end">
              <TypographyH3 class="text-primary">120</TypographyH3>
              <TypographySmall>KM</TypographySmall>
              <TypographyH3 class="font-thin px-2">/</TypographyH3>
              <TypographyH3 class="text-primary">150</TypographyH3>
              <TypographySmall>min.</TypographySmall>
            </RowCover>
          </ColCover>
        </div>
      </Fix>
      <Fix>
        <Card>
          <ColCover>
            <TypographyP>Distance to arrival:</TypographyP>
          </ColCover>
        </Card>
      </Fix>
    </ColCover>
  </Card>
</template>
