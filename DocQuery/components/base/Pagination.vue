<template>
  <div class="card">
    <Paginator
      ref="paginator"
      :template="{
        default:
          'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport',
      }"
      current-page-report-template="Showing {first} to {last} of {totalRecords}"
      :rows="10"
      :total-records="totalRecords"
      :rows-per-page-options="[10, 20, 30]"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  totalRecords: {
    type: Number,
    required: true,
  },
});
</script>
