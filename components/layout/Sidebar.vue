<script lang="ts" setup>
import { account } from "@/utils/appwrite";
import { useAuthStore, useIsLoadingStore } from "@/stores/auth.store";

const isLoadingStore = useIsLoadingStore();
const store = useAuthStore();
const router = useRouter();

const logout = async () => {
  isLoadingStore.set(true);
  await account.deleteSession("current");
  store.clear();
  await router.push("/login");
  isLoadingStore.set(false);
};
</script>

<!-- TODO Appwrite config + Auth -->

<template>
  <aside class="px-5 py-8 bg-sidebar h-screen relative">
    <NuxtLink to="/" class="mb-10 block">
      <NuxtImg src="/logo.svg" alt="" width="140px" class="mx-auto" />
    </NuxtLink>
    <button
      @click="logout"
      class="absolute top-2 right-3 transition-colors hover:text-primary"
    >
      <Icon name="line-md:logout" size="20" />
    </button>
    <LayoutMenu />
    <!-- <UiButton>Click me</UiButton> -->
  </aside>
</template>
