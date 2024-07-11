<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { v4 as uuidv } from "uuid";
import { defineProps } from "vue";
import { COLLECTION_DEALS, DB_ID } from "~/app.constants";
import type { IDeal } from "~/types/deals.types";

const isOpenForm = ref(false);

interface IDealFormState extends Pick<IDeal, "name" | "price"> {
  customer: {
    email: string;
    name: string;
  };
  status: string;
}

const props = defineProps({
  status: {
    type: String,
    default: "",
  },
  refetch: {
    type: Function,
  },
});

const { handleSubmit, defineField, handleReset } = useForm<IDealFormState>({
  initialValues: {
    status: props.status,
  },
});

const [name, nameAttrs] = defineField("name");
const [price, priceAttrs] = defineField("price");
const [customerEmail, customerEmailAttrs] = defineField("customer.email");
const [customerName, customerNameAttrs] = defineField("customer.name");

const { mutate, isPending } = useMutation({
  mutationKey: ["create a new deal"],
  mutationFn: async (data: IDealFormState) => {
    return await DB.createDocument(DB_ID, COLLECTION_DEALS, uuidv(), data);
  },
  onSuccess() {
    props.refetch && props.refetch();
    handleReset();
  },
  onError: (error: unknown) => {
    // Код, который выполняется при возникновении ошибки
    console.error("Error creating deal:", error);
    // Здесь можно также обновить состояние или показать уведомление пользователю
  },
});

const onSubmit = handleSubmit((values) => {
  mutate(values);
});
</script>

<template>
  <div class="text-center">
    <button
      class="transition-all opacity-5 hover:opacity-100 hover:text-[#252c8]"
      @click="isOpenForm = !isOpenForm"
    >
      <Icon
        v-if="isOpenForm"
        name="clarity:arrow-line"
        class="fade-in-100 trade-out-0"
        size="35"
      />
      <Icon
        v-else
        name="simple-line-icons:plus"
        class="fade-in-100 trade-out-0"
        size="35"
      />
    </button>
  </div>

  <form v-if="isOpenForm" @submit="onSubmit" class="form">
    <UiInput
      placeholder="Наименование"
      v-model="name"
      v-bind="nameAttrs"
      type="text"
      class="input"
    />
    <UiInput
      placeholder="Сумма"
      v-model="price"
      v-bind="priceAttrs"
      type="number"
      class="input"
    />
    <UiInput
      placeholder="Email"
      v-model="customerEmail"
      v-bind="customerEmailAttrs"
      type="text"
      class="input"
    />
    <UiInput
      placeholder="Наименование"
      v-model="customerName"
      v-bind="customerNameAttrs"
      type="text"
      class="input"
    />

    <button class="btn" :disabled="isPending">
      {{ isPending ? "Загрузка..." : "Добавить" }}
    </button>
  </form>
</template>

<style scoped>
.input {
  @apply border-[#161c26] mb-2 placeholder:text-[#748092] focus:border-border transition-colors;
}

.btn {
  @apply text-xs border py-1 rounded border-[#161c26] hover:border-[#482c65] transition-colors text-[#aebed5] hover:text-white;
}

@keyframes show {
  from {
    @apply border-[#a252c83d];
    transform: translateY(-35px);
    opacity: 0.4;
  }

  90% {
    @apply border-transparent;
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
