<script setup lang="ts">
useHead({
  title: "Login | CRM System",
});

const nameRef = ref("");
const emailRef = ref("");
const passwordRef = ref("");

watch(emailRef, () => {
  console.log(emailRef.value);
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="rounded bg-sidebar w-1/4 p-5">
      <h1 class="font-bold text-2xl text-center mb-5">Login</h1>
      <form>
        <UiInput
          type="name"
          placeholder="Name"
          class="mb-3"
          v-model="nameRef"
        />
        <UiInput
          type="email"
          placeholder="Email"
          class="mb-3"
          v-model="emailRef"
        />
        <UiInput
          type="password"
          placeholder="password"
          class="mb-3"
          v-model="passwordRef"
        />

        <div class="flex items-center justify-center gap-5">
          <UiButton type="button">Login</UiButton>
          <UiButton type="button">Register</UiButton>
        </div>
      </form>
    </div>
  </div>
</template>
