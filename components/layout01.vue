<script setup lang="ts">
const { loginForKakao } = useSign();
</script>
<template>
  <DevOnly>
    <div
      class="absolute top-0 left-0 z-30 w-full h-full text-red-500 border border-red-500 pointer-events-none"
    >
      01
    </div>
  </DevOnly>
  <Card>
    <RowCover class="items-center gap-1 p-1">
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
      <Button
        type="submit"
        class="text-black bg-yellow-300"
        @click="loginForKakao"
      >
        <font-awesome icon="comment" class="mr-2" />
        kakao
      </Button>
    </RowCover>
  </Card>
</template>
