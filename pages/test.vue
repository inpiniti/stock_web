<script lang="ts" setup></script>
<template>
  <div class="bg-neutral-300 h-svh w-full flex p-5">
    <div
      class="bg-neutral-100 h-full w-full flex rounded-3xl shadow-2xl p-5 gap-5"
    >
      <div class="shrink-0 flex flex-col gap-5">
        <div class="">
          <Avatar class="border">
            <AvatarImage
              src="https://potatomap.com/fried-potatoes.png"
              alt="potatomap"
            />
            <AvatarFallback>PM</AvatarFallback>
          </Avatar>
        </div>
        <div class="flex flex-col gap-3">
          <Avatar class="bg-white relative border">
            <font-awesome class="text-lg" icon="earth-americas" />
            <div
              class="absolute inset-0 bg-black opacity-30 pointer-events-none"
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
              class="absolute inset-0 bg-black opacity-30 pointer-events-none"
            ></div>
          </Avatar>
          <Avatar class="relative border">
            <AvatarImage
              src="https://s3-symbol-logo.tradingview.com/country/US.svg"
              alt="nasdaq"
            />
            <div
              class="absolute inset-0 bg-black opacity-30 pointer-events-none"
            ></div>
          </Avatar>
        </div>
        <div>c</div>
      </div>
      <div class="shrink-0 flex flex-col gap-2 text-neutral-400 text-sm">
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
      <div class="grow-0 flex flex-col w-full gap-5">
        <div class="shrink-0">
          <div class="relative w-full max-w-sm items-center">
            <Input
              id="search"
              type="text"
              placeholder="Search..."
              class="pl-10 border-0"
            />
            <span
              class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
            >
              <font-awesome class="text-lg" icon="magnifying-glass" />
            </span>
          </div>
        </div>
        <div class="grow-0 w-full h-full">
          <Card class="h-full border-0 p-6 gap-6 flex flex-col">
            <div class="flex w-full justify-between">
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
                <Card class="p-2 w-36 text-xs">
                  <p class="text-neutral-400">Top sales</p>
                  <p class="text-base font-bold">72</p>
                  <div>
                    <p>Mikasa</p>
                  </div>
                </Card>
                <Card class="p-2 w-36 text-xs bg-black text-white">
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
            <div class="bg-neutral-100 w-full rounded-full flex p-1 gap-1">
              <div class="p-1 bg-white rounded-full w-32 shadow-sm">abc</div>
              <div class="p-1 bg-white rounded-full w-32">abc</div>
              <div class="p-1 bg-white rounded-full w-32">abc</div>
              <div class="p-1 bg-white rounded-full w-32">abc</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
