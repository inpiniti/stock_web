<template>
  <DevOnly>
    <div
      class="absolute z-30 top-0 left-0 w-full h-full border-red-500 border text-red-500"
    >
      01
    </div>
  </DevOnly>
  <Card>
    <RowCover class="p-1 gap-1 items-center">
      <Avatar>
        <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <ColCover>
        <TypographySmall>Company</TypographySmall>
        <TypographyH4>Load Swift NYC</TypographyH4>
      </ColCover>
    </RowCover>
  </Card>
</template>
