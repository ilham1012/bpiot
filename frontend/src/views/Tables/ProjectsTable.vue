<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
            {{ title }}
          </h3>
        </div>
        <div class="col text-right">
          <base-button type="primary" size="sm">See all</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="projects"
      >
        <template v-slot:columns>
          <th>Project</th>
          <th>UID</th>
          <th>Description</th>
          <th></th>
        </template>

        <template v-slot:default="row">
          <th scope="row">
            <div class="media align-items-center">
              <a href="#" class="avatar rounded-circle mr-3">
                <!-- <img alt="Image placeholder" :src="row.item.img" /> -->
              </a>
              <div class="media-body">
                <span class="name mb-0 text-sm">{{ row.item.name }}</span>
              </div>
            </div>
          </th>
          <td class="uid">
            {{ row.item.project_uid }}
          </td>
          <td class="description">
            {{ row.item.description }}
          </td>

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

    <div
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <base-pagination total="30"></base-pagination>
    </div>
  </div>
</template>
<script>
import ProjectService from "../../services/project.service";
var del = 0;

export default {
  name: "projects-table",
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  data() {
    return {
      projects: [],
      currentProject: null,
      currentIndex: -1,
      // title: "",
      //   {
      //     id: 1,
      //     name: "Coffee Roaster",
      //     uid: "FFlBjQXwbb",
      //     description: "Smart Coffee Roaster Project w/ Subang",
      //   },
      //   {
      //     id: 2,
      //     name: "Water Quality",
      //     uid: "7f55FFlBjQ",
      //     description: "Water Quality monitoring",
      //   },
      //   {
      //     id: 3,
      //     name: "Smart Health",
      //     uid: "BjQ7f55FFl",
      //     description: "Smart Health: monitoring",
      //   },
      // ],
    };
  },
  methods: {
    retrieveProjects() {
      console.log("retrieve proj");

      ProjectService.getAll()
        .then((response) => {
          this.projects = response.data.data;
          console.log(response.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveProjects();
      this.currentProject = null;
      this.currentIndex = -1;
    },
    deleteProject(id) {
      del++;
      console.log("Delete ", id, " ", del, "x");

      ProjectService.delete(id)
        .then((response) => {
          console.log(response);
          this.retrieveProjects();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveProjects();
  },
};
</script>
<style></style>
