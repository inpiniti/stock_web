<script setup lang="ts">
const { loginForKakao, user } = useSign();
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
    <RowCover class="items-center gap-1 p-1" v-if="user">
      <Avatar>
        <AvatarImage :src="user.user_metadata.avatar_url" alt="@radix-vue" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <ColCover>
        <TypographySmall>{{ user.user_metadata.email }}</TypographySmall>
        <TypographyP>{{ user.user_metadata.name }}님</TypographyP>
      </ColCover>
      <Button type="submit" class="text-black" @click="loginForKakao">
        로그아웃
      </Button>
    </RowCover>
    <RowCover v-else>
      <Button
        type="submit"
        class="text-black bg-yellow-300"
        @click="loginForKakao"
      >
        <font-awesome icon="comment" class="mr-2" />
        KAKAO 로그인
      </Button>
    </RowCover>
  </Card>
</template>
