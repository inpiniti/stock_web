<script lang="ts" setup></script>
<template>
  <TooltipProvider>
    <div class="h-dvh w-full overflow-hidden">
      <div class="flex divide-x">
        <div class="h-dvh overflow-hidden divide-y flex flex-col w-80">
          <div class="shrink-0 flex h-[52px] items-center px-4">
            <h1 class="text-xl font-bold">Inpiniti</h1>
          </div>
          <div class="flex flex-col grow-[0] overflow-hidden divide-y">
            <Nav />
          </div>
        </div>
        <div class="w-full">
          <Tabs default-value="live">
            <div class="flex flex-col divide-y">
              <div class="flex items-center px-4 py-2 h-[52px]">
                <h1 class="text-xl font-bold">종목 리스트</h1>
                <div class="ml-auto flex gap-6">
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
                  </div>
                </div>
              </div>
              <div class="relative p-2">
                <Input placeholder="Search" class="pl-10" />
                <font-awesome
                  class="absolute top-5 left-5"
                  icon="magnifying-glass"
                />
              </div>
              <TabsContent value="live" class="m-0">
                <Live />
              </TabsContent>
              <TabsContent value="prediction" class="m-0">
                <Prediction />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  </TooltipProvider>
</template>
