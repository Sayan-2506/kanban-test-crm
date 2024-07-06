<script setup lang="ts">
import { useIsLoadingStore, useAuthStore } from "@/stores/auth.store";
import { v4 as uuidv } from "uuid";

useHead({
  title: "Login | CRM System",
});

const nameRef = ref("");
const emailRef = ref("");
const passwordRef = ref("");

const isLoadingStore = useIsLoadingStore();

const router = useRouter();
const authStore = useAuthStore();

const login = async () => {
  isLoadingStore.set(true);
  await account.createEmailPasswordSession(emailRef.value, passwordRef.value);
  const response = await account.get();
  if (response) {
    authStore.set({
      name: response.name,
      email: response.email,
      status: response.status,
    });
  }

  nameRef.value = "";
  emailRef.value = "";
  passwordRef.value = "";

  await router.push("/");
  isLoadingStore.set(false);
};

const register = async () => {
  await account.create(
    uuidv(),
    emailRef.value,
    passwordRef.value,
    nameRef.value
  );
  await login();
};
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
          <UiButton type="button" @click="login">Login</UiButton>
          <UiButton type="button" @click="register">Register</UiButton>
        </div>
      </form>
    </div>
  </div>
</template>
