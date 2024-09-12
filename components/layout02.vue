<template>
  <DevOnly>
    <div
      class="absolute z-30 top-0 left-0 w-full h-full border-red-500 border text-red-500 pointer-events-none"
    >
      02
    </div>
  </DevOnly>
  <Card>
    <ColCover class="gap-1 p-1">
      <Badge class="text-base">코스피</Badge>
      <Badge class="text-base border-0" variant="outline">코스닥</Badge>
      <Badge class="text-base border-0" variant="outline">나스닥</Badge>
    </ColCover>
  </Card>
</template>
