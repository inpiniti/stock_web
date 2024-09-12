<script setup lang="ts">
const sectorList = ref([
  "비에너지 미네럴",
  "리테일 트레이드",
  "의료 기술",
  "금융",
  "디스트리뷰션 서비스",
  "컨슈머 논-듀어러블즈",
  "전자 기술",
  "컨슈머 서비스",
  "유틸리티",
  "헬쓰 서비스",
  "이송/배달",
  "에너지 미네랄",
  "테크놀로지 서비스",
  "소비자 내구재",
  "커뮤니케이션",
  "프로세스 산업",
  "제조업",
  "코머셜 서비스",
  "기타 (Miscellaneous)",
  "인더스트리얼 서비스",
]);
</script>
<template>
  <DevOnly>
    <div
      class="absolute z-30 top-0 left-0 w-full h-full border-red-500 border text-red-500 pointer-events-none"
    >
      03
    </div>
  </DevOnly>
  <Card class="bg-primary text-white p-2 h-full">
    <ColCover>
      <Fix>
        <RowCover class="items-end">
          <ColCover class="p-1">
            <TypographyH3> AI Model </TypographyH3>
          </ColCover>
        </RowCover>
      </Fix>
      <Full>
        <ColCover class="overflow-y-scroll">
          <Badge class="bg-white text-primary">Duration</Badge>
          <Badge v-for="sector in sectorList">{{ sector }}</Badge>
        </ColCover>
      </Full>
    </ColCover>
  </Card>
</template>
