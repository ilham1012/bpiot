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
          <base-button class="btn btn-sm btn-neutral" @click="modals.modal3 = true">New</base-button>
          <a href="#" class="btn btn-sm btn-neutral">Filters</a>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <devices-table title="Light Table"></devices-table>
        </div>
      </div>
    </div>

    <modal v-model:show="modals.modal3"
           body-classes="p-0"
           modal-classes="modal-dialog-centered modal-sm">
      <card type="secondary" shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0">

        <form role="form" name="form" @submit.prevent="createDevice">
          <select name="" class="form-select" v-model="device.project_id">
            <option v-for="(item , index) in projects" v-bind:key="index" :selected="index == 1" >
              {{item.name}}
            </option>
          </select>
          <base-input formClasses="input-group-alternative mb-3"
                      placeholder="Device Name"
                      addon-left-icon="ni ni-email-83"
                      v-model="device.name">
          </base-input>
          <textarea class="form-control form-control-alternative"
                    rows="2"
                    placeholder="Device Description"
                    v-model="device.description">
          </textarea>
          <div class="text-center">
            <base-button type="primary" class="my-4" native-type="submit">Create Device</base-button>
          </div>
        </form>

      </card>
    </modal>

  </div>
</template>
<script>
import Device from "../models/device";
import DevicesTable from "./Tables/DevicesTable";
import ProjectService from "../services/project.service";

export default {
  name: "devices",
  data() {
    return {
      modals: {
        modal3: false
      },
      projects: [],
      device: new Device('',''),
    }
  },
  components: {
    DevicesTable,
  },
  methods: {
    createDevice(){
      console.log("Create Device");
      console.log(this.device);
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
  },
  mounted() {
    this.retrieveProjects();
  },
};
</script>
<style></style>
