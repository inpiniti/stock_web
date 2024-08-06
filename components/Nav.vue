<script lang="ts" setup>
const { market } = useSelected();

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
  <div class="shrink-0 p-2 flex gap-1 font-bold">
    주식 시장
    <Tooltip>
      <TooltipTrigger><font-awesome icon="circle-info" /></TooltipTrigger>
      <TooltipContent>
        <div>
          현재는 3개의 시장을 지원하고 있습니다. 추후 시장을 추가 될 수
          있습니다.
        </div>
      </TooltipContent>
    </Tooltip>
  </div>
  <div class="shrink-0 p-2 flex flex-col gap-1">
    <Button
      class="flex gap-2 text-left justify-normal py-0"
      @click="market = 'seoul'"
      :variant="market == 'seoul' ? 'default' : 'ghost'"
    >
      <img
        class="rounded-full ring-1 ring-neutral-400"
        src="https://s3-symbol-logo.tradingview.com/country/KR.svg"
      />
      KOSPI
    </Button>
    <Button
      class="flex gap-2 text-left justify-normal py-0"
      @click="market = 'kosdaq'"
      :variant="market == 'kosdaq' ? 'default' : 'ghost'"
    >
      <img
        class="rounded-full ring-1 ring-neutral-400"
        src="https://s3-symbol-logo.tradingview.com/country/KR.svg"
      />
      KOSDAQ
    </Button>
    <Button
      class="flex gap-2 text-left justify-normal py-0"
      @click="market = 'nasdaq'"
      :variant="market == 'nasdaq' ? 'default' : 'ghost'"
    >
      <img
        class="rounded-full ring-1 ring-neutral-400"
        src="https://s3-symbol-logo.tradingview.com/country/US.svg"
      />
      NASDAQ
    </Button>
  </div>
  <div class="shrink-0 p-2 flex gap-1 font-bold">
    머신러닝 학습 모듈
    <Tooltip>
      <TooltipTrigger><font-awesome icon="circle-info" /></TooltipTrigger>
      <TooltipContent>
        <div>
          전체 데이터를 학습한 모듈 1종, 시장별 데이터를 학습한 모듈 3종, 종목별
          데이터를 학습한 모듈 20종 총 24가지의 모듈을 제공합니다.
        </div>
        <div>
          * 시장별 데이터 학슴 모듈을 선택시에는 자동으로 시장이 선택됩니다.
        </div>
      </TooltipContent>
    </Tooltip>
  </div>
  <div class="grow-[0] h-full overflow-y-scroll p-2 flex flex-col gap-1">
    <Button class="flex gap-2 text-left justify-normal py-3">
      <font-awesome icon="globe" />
      ALL
    </Button>
    <Button variant="ghost" class="flex gap-2 text-left justify-normal py-3">
      <img
        class="rounded-full ring-1 ring-neutral-400"
        src="https://s3-symbol-logo.tradingview.com/country/KR.svg"
      />
      KOSPI
    </Button>
    <Button variant="ghost" class="flex gap-2 text-left justify-normal py-3">
      <img
        class="rounded-full ring-1 ring-neutral-400"
        src="https://s3-symbol-logo.tradingview.com/country/KR.svg"
      />
      KOSDAQ
    </Button>
    <Button variant="ghost" class="flex gap-2 text-left justify-normal py-3">
      <img
        class="rounded-full ring-1 ring-neutral-400"
        src="https://s3-symbol-logo.tradingview.com/country/US.svg"
      />
      NASDAQ
    </Button>
    <Button
      v-for="sector of sectorList"
      variant="ghost"
      :key="sector"
      class="flex gap-2 text-left justify-normal py-3"
    >
      <font-awesome v-if="sector.includes('의료')" icon="suitcase-medical" />
      <font-awesome
        v-else-if="sector.includes('금융')"
        icon="money-check-dollar"
      />
      <font-awesome v-else-if="sector.includes('전자')" icon="microchip" />
      <font-awesome v-else-if="sector.includes('헬쓰')" icon="weight-scale" />
      <font-awesome v-else-if="sector.includes('배달')" icon="truck" />
      <font-awesome v-else-if="sector.includes('제조')" icon="industry" />
      <font-awesome v-else-if="sector.includes('테크놀로지')" icon="memory" />
      <font-awesome
        v-else-if="sector.includes('커뮤니케이션')"
        icon="comments"
      />
      <font-awesome v-else-if="sector.includes('프로세스')" icon="cogs" />
      <font-awesome v-else-if="sector.includes('코머셜')" icon="store" />
      <font-awesome
        v-else-if="sector.includes('소비자')"
        icon="shopping-cart"
      />
      <font-awesome v-else-if="sector.includes('컨슈머')" icon="user-friends" />
      <font-awesome
        v-else-if="sector.includes('디스트리뷰션')"
        icon="truck-loading"
      />
      <font-awesome v-else-if="sector.includes('유틸리티')" icon="plug" />
      <font-awesome
        v-else-if="sector.includes('인더스트리얼')"
        icon="hard-hat"
      />
      <font-awesome v-else-if="sector.includes('리테일')" icon="store-alt" />
      <font-awesome v-else-if="sector.includes('비에너지')" icon="cloud-sun" />
      <font-awesome v-else-if="sector.includes('에너지')" icon="bolt" />
      <font-awesome v-else-if="sector.includes('기타')" icon="ellipsis-h" />

      {{ sector }}
    </Button>
  </div>
</template>
