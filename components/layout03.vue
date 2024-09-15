<script setup lang="ts">
const { sector } = useSelected();
const { status, getModel } = useAiModel();
const sectorList = ref({
  all: "전체",
  commercialServices: "코머셜 서비스",
  communications: "커뮤니케이션",
  consumerDurables: "소비자 내구재",
  consumerNonDurables: "컨슈머 논-듀어러블즈",
  consumerServices: "컨슈머 서비스",
  distributionServices: "디스트리뷰션 서비스",
  electronicTechnology: "전자 기술",
  energyMinerals: "에너지 미네랄",
  finance: "금융",
  healthServices: "헬쓰 서비스",
  healthTechnology: "의료 기술",
  industrialServices: "인더스트리얼 서비스",
  kosdaq: "코스닥",
  miscellaneous: "기타 (Miscellaneous)",
  nasdaq: "나스닥",
  nonEnergyMinerals: "비에너지 미네랄",
  processIndustries: "프로세스 산업",
  producerManufacturing: "제조업",
  retailTrade: "리테일 트레이드",
  seoul: "서울",
  technologyServices: "테크놀로지 서비스",
  transportation: "이송/배달",
  utilities: "유틸리티",
});

const selectSector = (newSector: string) => {
  sector.value = newSector;
  getModel(sector.value);
};
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
        <ColCover class="overflow-y-scroll gap-2">
          <Badge
            class="cursor-pointer hover:bg-white hover:text-primary"
            :class="sector == key ? 'bg-white text-primary' : ''"
            v-for="(value, key) in sectorList"
            :key="key"
            @click="selectSector(key)"
          >
            <p
              v-if="status == 'pending' && sector == key"
              class="text-center w-full"
            >
              <font-awesome icon="circle-notch" spin />
            </p>
            <p v-else>
              {{ value }}
            </p>
          </Badge>
        </ColCover>
      </Full>
    </ColCover>
  </Card>
</template>
