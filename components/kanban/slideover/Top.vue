<script setup lang="ts">
import { useDealSlideStore } from "~/stores/deal-slide.store";

const store = useDealSlideStore();
</script>

<template>
  <div class="border-border bg-black rounded p-3">
    <div class="uppercase bold text-xl mb-4">О сделке</div>
    <KanbanSlideoverLabel label-text="Название сделки">
      <h2>
        {{ store.card?.name }}
      </h2>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Сумма">
      {{ convertCurrency(store.card?.price || 0) }}
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Статус">
      <UiBadge variant="outline">
        {{ store.card?.status }}
      </UiBadge>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Клиент">
      {{ store.card?.companyName }}
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Дата создания">
      {{ $dayjs(store.card?.createdAt).format("DD MM YYYY") }}
    </KanbanSlideoverLabel>
  </div>
</template>
