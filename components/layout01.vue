<template>
  <DevOnly>
    <div
      class="absolute z-30 top-0 left-0 w-full h-full border-red-500 border text-red-500 pointer-events-none"
    >
      01
    </div>
  </DevOnly>
  <Card>
    <RowCover class="p-1 gap-1 items-center">
      <Avatar>
        <AvatarImage
          src="https://lh3.googleusercontent.com/ogw/AF2bZyjUvvbZ4WpJusKWejyocWVO1pDeCTDwr5XewoW8LVlRnQ=s32-c-mo"
          alt="@radix-vue"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <ColCover>
        <TypographySmall>younginpiniti@gmail.com</TypographySmall>
        <TypographyP>인피니티님</TypographyP>
      </ColCover>
    </RowCover>
  </Card>
</template>
