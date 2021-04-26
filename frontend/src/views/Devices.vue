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
          <base-button class="btn btn-sm btn-neutral" @click="modals.new_device = true">New</base-button>
          <a href="#" class="btn btn-sm btn-neutral">Filters</a>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <devices-table title="Device List" ref="deviceTable"></devices-table>
        </div>
      </div>
    </div>

    <modal v-model:show="modals.new_device"
           ref="modal_new_device"
           body-classes="p-0"
           modal-classes="modal-dialog-centered modal-sm">
      <card type="secondary" shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0">

        <!-- <template v-slot:header> -->
          <h3 class="modal-title mb-3" id="modal-title-default">Create New Device</h3>
        <!-- </template> -->

        <form role="form" name="form" @submit.prevent="createDevice">
          <!-- <vue-select
            v-model="device.project"
            :options="projects"
            label-by="name"
          ></vue-select> -->
          <!-- <Multiselect
            class="input-group-alternative mb-3"
            v-model="device.project"
            placeholder="Select project"
            :options="projects"
            :valueProp="id"
            :label="name"
            :trackBy="name"
          /> -->
          
          <select name="" class="form-control input-group-alternative mb-3" v-model="device.project">
            <option v-for="(item , index) in projects" v-bind:key="index" :selected="index == 0" v-bind:value="item">
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
import DeviceService from '../services/device.service';
import DevicesTable from "./Tables/DevicesTable";
import ProjectService from "../services/project.service";

export default {
  name: "devices",
  data() {
    return {
      modals: {
        new_device: false
      },
      projects: [],
      device: new Device("",""),
    }
  },
  components: {
    DevicesTable,
  },
  methods: {
    createDevice(){
      console.log("Create Device");
      console.log(this.device);
      DeviceService.create(this.device)
        .then(() => {
          this.$refs.modal_new_device.closeModal();
          this.$refs.deviceTable.retrieveDevices();
        });
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
