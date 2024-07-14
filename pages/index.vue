<script lang="ts" setup>
import { useMutation } from "@tanstack/vue-query";
import { COLLECTION_DEALS, DB_ID } from "~/app.constants";
import type { ICard, IColumn } from "~/components/kanban/kanban.types";
import { useKanbanQuery } from "~/components/kanban/useKanbanQuery";
import { EnumStatus } from "~/types/deals.types";
import { generateColumnStyle } from "@/components/kanban/generate-gradient";
import { useDealSlideStore } from "~/stores/deal-slide.store";

useHead({
  title: "Home | CRM System",
});

const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const { data, isLoading, refetch } = useKanbanQuery();
const store = useDealSlideStore();

type TypeMutationVariables = {
  docId: string;
  status?: EnumStatus;
};

const { mutate } = useMutation({
  mutationKey: ["move card"],
  mutationFn: async ({ docId, status }: TypeMutationVariables) => {
    return await DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, {
      status,
    });
  },
  onSuccess: () => {
    refetch();
  },
  onError: (error: unknown) => {
    // Код, который выполняется при возникновении ошибки
    console.error("Error update deal:", error);
    // Здесь можно также обновить состояние или показать уведомление пользователю
  },
});

function handleDragStart(card: ICard, column: IColumn) {
  dragCardRef.value = card;
  sourceColumnRef.value = column;
}

function handleDragOver(event: DragEvent) {
  event.preventDefault();
}

function handleDrop(targetColumn: IColumn) {
  if (dragCardRef.value && sourceColumnRef.value) {
    mutate({ docId: dragCardRef.value.id, status: targetColumn.id });
  }
}
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">CRM System by RED GROUP</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="grid grid-cols-5 gap-16">
        <div
          v-for="(column, index) in data"
          :key="column.id"
          @dragover="handleDragOver"
          @drop="() => handleDrop(column)"
          class="min-h-screen"
        >
          <div
            class="rounded bg-slate-700 py-1 px-5 mb-2 text-center"
            :style="generateColumnStyle(index, data?.length)"
          >
            {{ column.name }}
          </div>
          <KanbanCreateDeal :refetch="refetch" :status="column.id" />

          <UiCard
            v-for="card in column.items"
            class="mb-5"
            :key="card.id"
            draggable="true"
            @dragstart="() => handleDragStart(card, column)"
          >
            <UiCardHeader role="button" @click="store.set(card)">
              <UiCardTitle>{{ card.name }}</UiCardTitle>
              <UiCardDescription class="mt-2 block">{{
                convertCurrency(card.price)
              }}</UiCardDescription>
            </UiCardHeader>
            <UiCardContent class="text-xs"
              ><div>Компания {{ card.companyName }}</div></UiCardContent
            >
            <UiCardFooter>{{
              $dayjs(card.$createdAt).format("DD MMMM YYYY")
            }}</UiCardFooter>
          </UiCard>
        </div>
      </div>
      <KanbanSlideover />
    </div>
  </div>
</template>
