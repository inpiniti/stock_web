<script lang="ts" setup>
import { cn } from "@/lib/utils";
const isCollapsed = ref(false);

const accounts = [
  {
    label: "Alicia Koch1",
    email: "alicia@example.com",
    icon: "ion:logo-vercel",
  },
  {
    label: "Alicia Koch2",
    email: "alicia@gmail.com",
    icon: "mdi:google",
  },
  {
    label: "Alicia Koch3",
    email: "alicia@me.com",
    icon: "bx:bxl-gmail",
  },
];

const selectedEmail = ref<string>(accounts[0].email);
const selectedEmailData = computed(() =>
  accounts.find((item) => item.email === selectedEmail.value)
);
</script>
<template>
  <Select>
    <SelectTrigger
      aria-label="Select account"
      :class="
        cn(
          'flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0',
          {
            'flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden':
              isCollapsed,
          }
        )
      "
    >
      <SelectValue placeholder="Select an account">
        <div class="flex items-center gap-3">
          <Icon class="size-4" :icon="selectedEmailData!.icon" />
          <span v-if="!isCollapsed">
            {{ selectedEmailData!.label }}
          </span>
        </div>
      </SelectValue>
    </SelectTrigger>
    <SelectContent>
      <SelectItem
        v-for="account of accounts"
        :key="account.email"
        :value="account.email"
      >
        <div
          class="flex items-center gap-3 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-foreground"
        >
          <Icon class="size-4" :icon="account.icon" />
          {{ account.email }}
        </div>
      </SelectItem>
    </SelectContent>
  </Select>
</template>
