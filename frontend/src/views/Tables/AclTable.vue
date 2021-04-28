<template>
  <div>
    <h5 class="pl-3 heading-small text-muted">{{ title }}</h5>

    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush table-hover"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="acls"
      >
        <template v-slot:columns>
          <th>Pattern</th>
          <th></th>
        </template>

        <template v-slot:default="row">
          <th scope="row">
            {{ row.item.pattern }}
          </th>          

          <td class="text-right">
            <base-button
              nativeType="button"
              type="danger"
              size="sm"
              @click="deleteProject(row.item.id)"
            >
              Delete
            </base-button>
          </td>
        </template>
      </base-table>
    </div>

  </div>
</template>
<script>
export default {
  name: "acl-table",
  props: {
    type: {
      type: String,
    },
    title: String,
    acls: Array,
  },
};
</script>
<style></style>
