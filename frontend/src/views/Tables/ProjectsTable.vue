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
            {{ row.item.uid }}
          </td>
          <td class="description">
            {{ row.item.description }}
          </td>

          <td class="text-center">
            <base-button
              nativeType="button"
              size="sm"
              type="primary"
              @click="showPopUpUpdate(row.item.id)"
            >
              Update
            </base-button>
            <base-button
              nativeType="button"
              type="danger"
              size="sm"
              @click="showPopUpDelete(row.item.id)"
            >
              Delete
            </base-button>
          </td>
        </template>
      </base-table>
    </div>

    <modal v-model:show="modals.update_project"
           ref="modal_update_project"
           body-classes="p-0"
           modal-classes="modal-dialog-centered modal-sm">
      <card type="secondary" shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0">

        <!-- <template v-slot:header> -->
          <h3 class="modal-title mb-3" id="modal-title-default">Update Project</h3>
        <!-- </template> -->

        <form role="form" name="form" @submit.prevent="updateProject">          
          <base-input formClasses="input-group-alternative mb-3"
                      placeholder="Project Name *"
                      addon-left-icon="ni ni-email-83"
                      v-model="project.name">
          </base-input>
          <textarea class="form-control form-control-alternative"
                    rows="2"
                    placeholder="Project Description"
                    v-model="project.description">
          </textarea>
          <div class="text-center">
            <base-button type="primary" class="my-4" native-type="submit" v-bind:disabled="project.name == 0">
              Update Project
            </base-button>
          </div>
        </form>

      </card>
    </modal>

    <modal v-model:show="modals.delete_project"
           ref="modal_delete_project"
           body-classes="p-0"
           modal-classes="modal-dialog-centered modal-sm">
      <card type="secondary" shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0">
      
          <h3 class="modal-title mb-3 text-center" id="modal-title-default">Delete Project?</h3>
          <div class="text-center">
            <base-button block type="danger" class="my-4" native-type="submit" @click="deleteProject">
              Delete
            </base-button>
            <base-button block type="secondary" class="my-4" @click="this.$refs.modal_delete_project.closeModal()">
              Cancel
            </base-button>
          </div>
      </card>
    </modal>

    <!-- <div
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <base-pagination total="30"></base-pagination>
    </div> -->
  </div>
</template>
<script>
import Project from '../../models/project';
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
      modals: {
        update_project: false,
        delete_project: false
      },
      project: new Project("", ""),
      id: ""
    };
  },
  methods: {
    showPopUpUpdate(id) {
      this.modals.update_project = true;
      this.id = id;

      // Membaca data item project dari database
      ProjectService.get(id)
        .then(response => {
          this.project = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    showPopUpDelete(id) {
      this.modals.delete_project = true;
      this.id = id;
    },
    retrieveProjects() {
      console.log("retrieve proj");

      ProjectService.getAll()
        .then((response) => {
          this.projects = response.data;
          console.log(response.data);
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
    deleteProject() {
      del++;
      console.log("Delete ", this.id, " ", del, "x");

      ProjectService.delete(this.id)
        .then((response) => {
          console.log(response);
          this.$refs.modal_delete_project.closeModal();
          this.retrieveProjects();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateProject() {
      console.log("Update Project");
      console.log(this.project);
      ProjectService.update(this.id, this.project)
        .then(response => {
          console.log(response.data);
          console.log("Project berhasil diupdate");
          this.$refs.modal_update_project.closeModal();
          this.retrieveProjects();
        })
        .catch(e => {
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
