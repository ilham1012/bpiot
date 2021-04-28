<template>
  <div>

    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
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
import AclService from "../../services/acl.service";

export default {
  name: "acl-table",
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  data() {
    return {
      acls: [], //new Acl("", ""),
    };
  },
  methods: {
    retrieveAcls() {
      console.log("retrieve Acl");

      AclService.get(this.$route.params.id)
        .then((response) => {
          this.acls = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveAcls();
  },
};
</script>
<style></style>
