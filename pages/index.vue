<script lang="ts" setup></script>
<template>
  <div class="p-2 w-svw h-svh bg-neutral-200">
    <RowCover class="gap-5 p-5 bg-neutral-100 rounded-3xl">
      <Fix>
        <ColCover class="gap-5">
          <Fix> <Layout00 /> </Fix>
          <Fix> <Layout01 /> </Fix>
          <Fix> <Layout02 /> </Fix>
          <Full> <Layout03 /> </Full>
          <Fix> <Layout04 /> </Fix>
          <Fix> <Layout05 /> </Fix>
        </ColCover>
      </Fix>
      <Full>
        <ColCover class="gap-5">
          <Fix> <Layout10 /> </Fix>
          <Full> <Layout11 /> </Full>
          <Fix>
            <RowCover class="gap-5">
              <Full>
                <Layout12 />
              </Full>
              <Fix>
                <Layout22 />
              </Fix>
            </RowCover>
          </Fix>
          <Fix>
            <RowCover class="gap-5">
              <Full>
                <RowCover class="gap-5">
                  <Full>
                    <Layout13 />
                  </Full>
                  <Full>
                    <Layout14 />
                  </Full>
                </RowCover>
              </Full>
              <Fix>
                <Layout23 />
              </Fix>
            </RowCover>
          </Fix>
        </ColCover>
      </Full>
    </RowCover>
  </div>
</template>
<style>
.bg-primary {
  background-color: hsl(var(--primary));
}
.text-primary {
  color: hsl(var(--primary));
}
</style>
