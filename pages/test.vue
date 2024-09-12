<script lang="ts" setup></script>
<template>
  <div class="flex w-full p-5 bg-neutral-300 h-svh">
    <div
      class="flex w-full h-full gap-5 p-5 shadow-2xl bg-neutral-100 rounded-3xl"
    >
      <div class="flex flex-col gap-5 shrink-0">
        <div class="">
          <Button>test</Button>
          <Avatar class="border">
            <AvatarImage
              src="https://potatomap.com/fried-potatoes.png"
              alt="potatomap"
            />
            <AvatarFallback>PM</AvatarFallback>
          </Avatar>
        </div>
        <div class="flex flex-col gap-3">
          <Avatar class="relative bg-white border">
            <font-awesome class="text-lg" icon="earth-americas" />
            <div
              class="absolute inset-0 bg-black pointer-events-none opacity-30"
            ></div>
          </Avatar>
          <Avatar class="relative border">
            <AvatarImage
              src="https://s3-symbol-logo.tradingview.com/country/KR.svg"
              alt="kospi"
            />
          </Avatar>
          <Avatar class="relative border">
            <AvatarImage
              src="https://s3-symbol-logo.tradingview.com/country/KR.svg"
              alt="kosdaq"
            />
            <div
              class="absolute inset-0 bg-black pointer-events-none opacity-30"
            ></div>
          </Avatar>
          <Avatar class="relative border">
            <AvatarImage
              src="https://s3-symbol-logo.tradingview.com/country/US.svg"
              alt="nasdaq"
            />
            <div
              class="absolute inset-0 bg-black pointer-events-none opacity-30"
            ></div>
          </Avatar>
        </div>
        <div>c</div>
      </div>
      <div class="flex flex-col gap-2 text-sm shrink-0 text-neutral-400">
        <div class="text-black">비에너지 미네럴</div>
        <div>리테일 트레이드</div>
        <div>의료 기술</div>
        <div>금융</div>
        <div>디스트리뷰션 서비스</div>
        <div>컨슈머 논-듀어러블즈</div>
        <div>컨슈머 논-듀어러블즈</div>
        <div>컨슈머 논-듀어러블즈</div>
        <div>컨슈머 논-듀어러블즈</div>
        <div>컨슈머 논-듀어러블즈</div>
        <div>컨슈머 논-듀어러블즈</div>
        <div>컨슈머 논-듀어러블즈</div>
        <div>컨슈머 논-듀어러블즈</div>
        <div>컨슈머 논-듀어러블즈</div>
        <div>컨슈머 논-듀어러블즈</div>
        <div>컨슈머 논-듀어러블즈</div>
        <div>컨슈머 논-듀어러블즈</div>
        <div>컨슈머 논-듀어러블즈</div>
        <div>컨슈머 논-듀어러블즈</div>
        <div>컨슈머 논-듀어러블즈</div>
        <div>컨슈머 논-듀어러블즈</div>
      </div>
      <div class="flex flex-col w-full gap-5 grow-0">
        <div class="shrink-0">
          <div class="relative items-center w-full max-w-sm">
            <Input
              id="search"
              type="text"
              placeholder="Search..."
              class="pl-10 border-0"
            />
            <span
              class="absolute inset-y-0 flex items-center justify-center px-2 start-0"
            >
              <font-awesome class="text-lg" icon="magnifying-glass" />
            </span>
          </div>
        </div>
        <div class="w-full h-full grow-0">
          <Card class="flex flex-col h-full gap-6 p-6 border-0">
            <div class="flex justify-between w-full">
              <div>
                <div>Apple</div>
                <div class="flex gap-2">
                  <CardTitle>
                    $528,076<span class="text-neutral-400">.82</span>
                  </CardTitle>
                  <Badge variant="destructive">+ 7.9%</Badge>
                  <Badge variant="destructive"
                    >$27,335<span class="text-red-300">.09</span></Badge
                  >
                </div>
                <CardDescription>Card Description</CardDescription>
              </div>
              <div class="flex gap-3">
                <Card class="p-2 text-xs w-36">
                  <p class="text-neutral-400">Top sales</p>
                  <p class="text-base font-bold">72</p>
                  <div>
                    <p>Mikasa</p>
                  </div>
                </Card>
                <Card class="p-2 text-xs text-white bg-black w-36">
                  <p class="text-neutral-400">Best deal</p>
                  <p class="text-base font-bold">$42,300</p>
                  <div>
                    <p>Rolf Inc.</p>
                  </div>
                </Card>
                <Card class="p-2 text-xs">
                  <p>Top sales</p>
                  <p class="text-base">72</p>
                  <div>
                    <p>Mikasa</p>
                  </div>
                </Card>
                <Card class="p-2 text-xs">
                  <p>Top sales</p>
                  <p class="text-base">72</p>
                  <div>
                    <p>Mikasa</p>
                  </div>
                </Card>
              </div>
            </div>
            <div class="flex w-full gap-1 p-1 rounded-full bg-neutral-100">
              <div class="w-32 p-1 bg-white rounded-full shadow-sm">abc</div>
              <div class="w-32 p-1 bg-white rounded-full">abc</div>
              <div class="w-32 p-1 bg-white rounded-full">abc</div>
              <div class="w-32 p-1 bg-white rounded-full">abc</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
