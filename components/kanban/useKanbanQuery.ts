import { useQuery } from "@tanstack/vue-query";
import { COLLECTION_DEALS, DB_ID } from "~/app.constants";
import { KANBAN_DATA } from "./kanban.data";
import type { ICard, IColumn } from "./kanban.types";
import type { IDeal } from "~/types/deals.types";

export function useKanbanQuery() {
  return useQuery({
    queryKey: ["deals"],
    queryFn: async () => {
      const response = await DB.listDocuments(DB_ID, COLLECTION_DEALS);
      return response.documents as unknown as IDeal[];
    },
    select(data) {
      const newBoard: IColumn[] = [...KANBAN_DATA].map((column) => ({
        ...column,
        items: [],
      }));
      const deals = data as unknown as IDeal[];
      // здесь можно добавить логику для преобразования данных и обновления newBoard

      for (const deal of deals) {
        const column = newBoard.find((col) => col.id === deal.status);

        if (column) {
          column.items.push({
            $createdAt: deal.$createdAt,
            id: deal.$id,
            name: deal.name,
            price: deal.price,
            companyName: deal.customer.name,
            status: column.name,
          });
        }
      }

      return newBoard;
    },
  });
}
