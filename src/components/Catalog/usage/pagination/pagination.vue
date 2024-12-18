<script setup>
/* ==================================================
   Imports
   ================================================== */
// Vue Composition API
import { watch, ref, onMounted } from "vue";

// Router Imports
import { useRoute, useRouter } from "vue-router";

// UI Imports
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev
} from "@/components/ui/pagination/index.js";
import { Button } from "@/components/ui/button/index.js";

// Store Imports
import { useFetchGoodsStore } from "@/stores/fetchGoods.js";

/* ==================================================
   Reactive State
   ================================================== */
const store = useFetchGoodsStore();
const router = useRouter();
const route = useRoute();

const totalCount = ref(store.total);
const currentPage = ref(0);

/* ==================================================
   Methods
   ================================================== */
const fetchGoods = async (value) => {
  currentPage.value = value;
  store.page = currentPage.value;
  await store.fetchAllGoods();
  await router.push({ query: { page: currentPage.value } });
};

/* ==================================================
   Watchers
   ================================================== */
watch(
    () => store.total,
    (newTotal) => {
      totalCount.value = newTotal;
    }
);

watch(
    () => route.query.page,
    async (newPage) => {
      currentPage.value = parseInt(newPage);
      await fetchGoods(newPage);
      console.log(currentPage.value);
    }
);

/* ==================================================
   Lifecycle Hooks
   ================================================== */
onMounted(async () => {
  await router.push({ query: { page: 1 } });
  currentPage.value = 1;
  fetchGoods(currentPage.value);
});
</script>


<template>
  <Pagination  v-slot="{ page }" :total="totalCount" :sibling-count="1" show-edges :default-page="1">
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <template v-for="(item, index) in items">
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <Button @click = "fetchGoods(item.value)" class="w-10 h-10 p-0" :variant="item.value == currentPage ? 'default' : 'outline'">
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

    </PaginationList>
  </Pagination>
</template>

<style scoped>

</style>