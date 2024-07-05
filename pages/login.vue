<script setup lang="ts">
useHead({
  title: "Login",
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="rounded bg-sidebar w-1/4 p-5">
      <h1 class="font-bold text-2xl text-center mb-5">Login</h1>
      <form>
        <UiInput type="text" placeholder="shadcn" />
      </form>
    </div>
  </div>
</template>
