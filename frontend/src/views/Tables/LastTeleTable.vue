<template>
  <div>
    <h5 class="pl-3 heading-small text-muted">{{ title }}</h5>

    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush table-hover"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tele"
      >
        <template v-slot:columns>
          <th>Time</th>
          <th>Key</th>
          <th>Value</th>
        </template>

        <template v-slot:default="row">
          <th scope="row">{{ row.item.time }}</th>
          <td>{{ row.item.key }}</td>
          <td>{{ row.item.value }}</td>
        </template>
      </base-table>
    </div>

  </div>
</template>
<script>
export default {
  name: "last-tele-table",
  props: {
    type: {
      type: String,
    },
    title: String,
    tele: Array,
  },
};
</script>
<style></style>
