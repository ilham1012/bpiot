<template>
  <div>
    <base-header type="gradient-primary" class="pb-6 pb-8 pt-5 pt-md-8">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
            <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
              <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
              <li class="breadcrumb-item"><a href="#">Components</a></li>
              <li class="breadcrumb-item active" aria-current="page">Icons</li>
            </ol>
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <base-button class="btn btn-sm btn-neutral" @click="modals.new_project = true">New</base-button>
          <a href="#" class="btn btn-sm btn-neutral">Filters</a>
        </div>
      </div>
     
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <projects-table title="Project List" ref="projectTable"></projects-table>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col">
        </div>
      </div>
    </div>

    <modal v-model:show="modals.new_project"
           ref="modal_new_project"
           body-classes="p-0"
           modal-classes="modal-dialog-centered modal-sm">
      <card type="secondary" shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0">

        <!-- <template v-slot:header> -->
          <h3 class="modal-title mb-3" id="modal-title-default">Create New Project</h3>
        <!-- </template> -->

        <form role="form" name="form" @submit.prevent="createProject">          
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
            <base-button id="btnCreateProject" type="primary" class="my-4" native-type="submit" 
            v-bind:disabled="project.name == 0">
              Create Project
            </base-button>
          </div>
        </form>

      </card>
    </modal>

  </div>
</template>
<script>
import Project from "../models/project";
import ProjectsTable from "./Tables/ProjectsTable";
import ProjectService from "../services/project.service";

export default {
  name: "projects",
  data() {
    return {
      modals: {
        new_project: false
      },
      project: new Project("",""),
    }
  },
  components: {
    ProjectsTable,
  },
  methods: {
    createProject(){
      console.log("Create Project");
      console.log(this.project);
      ProjectService.create(this.project)
        .then(() => {
          this.project.name = "";
          this.project.description = "";
          this.$refs.modal_new_project.closeModal();
          this.$refs.projectTable.retrieveProjects();
        });
    },
  }
};
</script>
<style></style>
