<script lang="ts" setup>
import { MENU } from "./menu.data";
</script>

<template>
  <div>
    <NuxtLink
      class="flex items-center py-1 px-3 rounded-lg w-full hover:bg-gray-700 hover:shadow transition-all mb-2.5"
      :to="item.url"
      v-for="item in MENU"
      :key="item.url"
    >
      <Icon :name="item.icon" class="mr-3" />
      <span>{{ item.name }}</span>
    </NuxtLink>
  </div>
</template>
