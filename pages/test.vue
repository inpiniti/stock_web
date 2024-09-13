<script lang="ts" setup></script>
<template>
  <TooltipProvider>
    <div class="w-full overflow-hidden h-dvh">
      <div class="flex divide-x">
        <div class="flex flex-col overflow-hidden divide-y h-dvh w-80">
          <div class="shrink-0 flex h-[52px] items-center px-4">
            <h1 class="text-xl font-bold">Inpiniti</h1>
          </div>
          <div class="flex flex-col grow-[0] overflow-hidden divide-y">
            <Nav />
          </div>
        </div>
        <div class="flex flex-col w-full overflow-hidden divide-y h-dvh">
          <div class="shrink-0 flex items-center px-4 py-2 h-[52px]">
            <h1 class="text-xl font-bold">종목 리스트</h1>
            <div class="flex gap-6 ml-auto">
              <div class="flex items-center gap-1">
                게시판
                <Tooltip>
                  <TooltipTrigger>
                    <font-awesome icon="circle-info" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div>현재는 지원하지 않습니다.</div>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div class="flex items-center gap-1">
                예측 API
                <Tooltip>
                  <TooltipTrigger>
                    <font-awesome icon="circle-info" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div>현재는 지원하지 않습니다.</div>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div class="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label for="airplane-mode">
                  관심종목
                  <Tooltip>
                    <TooltipTrigger>
                      <font-awesome icon="circle-info" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div>로그인 사용자만 관심종목 분석이 가능합니다.</div>
                    </TooltipContent>
                  </Tooltip>
                </Label>
              </div>
              <div>
                <Tabs default-value="live">
                  <TabsList>
                    <TabsTrigger
                      value="live"
                      class="text-zinc-600 dark:text-zinc-200"
                    >
                      Live
                    </TabsTrigger>
                    <TabsTrigger
                      value="prediction"
                      class="text-zinc-600 dark:text-zinc-200"
                    >
                      예측
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
          <div class="relative p-2 shrink-0">
            <Input placeholder="Search" class="pl-10" />
            <font-awesome
              class="absolute top-5 left-5"
              icon="magnifying-glass"
            />
          </div>
          <div value="live" class="grow-[0] overflow-hidden h-full m-0">
            <Live />
          </div>
        </div>
      </div>
    </div>
  </TooltipProvider>
</template>
