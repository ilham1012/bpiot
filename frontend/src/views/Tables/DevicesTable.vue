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
        :data="devices"
      >
        <template v-slot:columns>
          <th>Name</th>
          <th>UID</th>
          <th>Project</th>
          <th>Token</th> 
          <th>Action</th>
        </template>

        <template v-slot:default="row">
          <th scope="row">
            <div class="media align-items-center">
              
              <div class="media-body">
                <span class="name mb-0 text-sm">
                  <a v-bind:href="'#' + /device/ + row.item.id">
                    {{ row.item.name }}
                  </a>
                </span>
              </div>
            </div>
          </th>
          <td class="uid">
            {{ row.item.uid }}
          </td>
          <td>
            {{ row.item.project_id }}
          </td>
          <td class="token">
            <base-button class="btn btn-sm btn-neutral" @click="showTokenModal(row.item)">See Token</base-button>
          </td>

          <td class="text-right">
            <base-button
              nativeType="button"
              type="primary"
              size="sm"
              @click="showUpdate(row.item.id)"
            >
              Update
            </base-button>
            <base-button
              nativeType="button"
              type="danger"
              size="sm"
              @click="popUpDelete(row.item.id)"
            >
              Delete
            </base-button>
          </td>
        </template>
      </base-table>
    </div>

    <!-- <div
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <base-pagination total="30"></base-pagination>
    </div> -->
    
    <modal v-model:show="modals.device_update"
           body-classes="p-0"
           modal-classes="modal-dialog-centered modal-sm">
      <card type="secondary" shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0">

        <!-- <template v-slot:header> -->
          <h3 class="modal-title mb-3" id="modal-title-default">Update Device</h3>
        <!-- </template> -->

        <form role="form" name="form" @submit.prevent="updateDevice">
          <select name="" class="form-control input-group-alternative mb-3" v-model="device.project">
            <option v-for="(item , index) in projects" v-bind:key="index" :selected="index == 0" v-bind:value="item">
              {{item.name}}
            </option>
          </select>          
          <base-input formClasses="input-group-alternative mb-3"
                      placeholder="Project Name"
                      addon-left-icon="ni ni-email-83"
                      v-model="device.name">
          </base-input>
          <textarea class="form-control form-control-alternative"
                    rows="2"
                    placeholder="Project Description"
                    v-model="device.description">
          </textarea>
          <div class="text-center">
            <base-button type="primary" class="my-4" native-type="submit">Update Project</base-button>
          </div>
        </form>

      </card>
    </modal>
    <modal v-model:show="modals.modal_token"
          ref="modal_token"
          body-classes="p-0"
          modal-classes="modal-dialog-centered modal-sm">

      <card type="secondary" shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0">
        <div>
          <h2>{{ currentDevice.name || "-" }}</h2>
          <div><b>Device UID:</b> {{ currentDevice.uid || "-" }}</div>
          <div><b>Device Token:</b></div>
          <textarea id="token_area" class="form-control form-control-alternative" rows="3" :value="currentDevice.token"/>
        </div>
        <template v-slot:footer>
          <base-button type="secondary" @click="modals.modal_token = false">Close</base-button>
          <base-button type="primary" v-if="currentDevice.token == null" @click="generateToken(currentDevice)">Generate Token</base-button>
          <base-button type="primary" v-if="currentDevice.token != null" data-clipboard-target="#token_area">Copy Token</base-button>
      </template>
      </card>
    </modal>
    <modal v-model:show="modals.delete_device"
           ref="modal_delete_device"
           body-classes="p-0"
           modal-classes="modal-dialog-centered modal-sm">
      <card type="secondary" shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0">
      
          <h3 class="modal-title mb-3" id="modal-title-default">Delete Device?</h3>
          <div class="text-center">
            <base-button
              nativeType="button"
              type="danger"
              size="sm"
              @click="deleteDevice"
            >
              Delete
            </base-button>
             <base-button
              nativeType="button"
              type="primary"
              size="sm"
              @click="cancel"
            >
              cancel
            </base-button>
          </div>
          
          
      </card>
    </modal>
  </div>
</template>
<script>
import BaseButton from '../../components/BaseButton.vue';
import Device from "../../models/device";
import DeviceService from '../../services/device.service';
import ProjectService from "../../services/project.service";
export default {
  components: { BaseButton },
  name: "devices-table",
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  data() {
    return {
      devices: [],
      projects: [],
      currentDevice: new Device('',''),
      modals: {
        modal_token: false,
        device_update:false,
        delete_device:false,

      },
      device: new Device("",""),
      id:""
     
    };
  },
  methods: {
    showUpdate(id){
      this.modals.device_update = true;
      this.id = id;

      DeviceService.get(id)
        .then(response => {
          this.device = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    popUpDelete(id){
      this.modals.delete_device = true;
      this.id = id;
    },
    retrieveDevices() {
      console.log("retrieve device");

      DeviceService.getAll()
        .then((response) => {
          this.devices = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
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

    refreshList() {
      this.retrieveDevices();
      this.currentDevice = null;
      this.currentIndex = -1;
    },
    deleteDevice() {
      DeviceService.delete(this.id)
        .then((response) => {
          console.log(response);
         
          this.retrieveDevices();
          this.modals.delete_device = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    cancel(id){
      this.modals.delete_device = false;
      this.id = id;
    },
    showTokenModal(device){
      this.currentDevice = device;
      this.modals.modal_token = true;
    },
    
    generateToken(device){
      DeviceService.generateToken(device)
        .then((response) => {
          console.log(response);
          this.currentDevice.token = response.data.accessToken;
          // this.retrieveDevices();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateDevice(){
      console.log("Update Device");
      console.log(this.device);
      DeviceService.update(this.id, this.device)
        .then(response => {
          console.log(response.data);
          console.log("Device Berhasil Diupdate");
          this.retrieveDevices();
          this.modals.device_update = false;
        })
        .catch(e => {
          console.log(e);
        });
    }
  
  },
  mounted() {
    this.retrieveDevices();
    this.retrieveProjects();
  },
};
</script>
<style></style>
