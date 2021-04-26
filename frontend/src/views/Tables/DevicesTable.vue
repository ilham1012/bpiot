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
              <!-- <a href="#" class="avatar rounded-circle mr-3"> -->
                <!-- <img alt="Image placeholder" :src="row.item.img" /> -->
              <!-- </a> -->
              <div class="media-body">
                <span class="name mb-0 text-sm">{{ row.item.name }}</span>
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

    <!-- <div
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <base-pagination total="30"></base-pagination>
    </div> -->

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
          <textarea class="form-control form-control-alternative" rows="3" :value="currentDevice.token"/>
        </div>
        <template v-slot:footer>
          <base-button type="secondary" @click="modals.modal_token = false">Close</base-button>
          <base-button type="primary" v-if="currentDevice.token == null" @click="generateToken(currentDevice)">Generate Token</base-button>
          <base-button type="primary" v-if="currentDevice.token != null" >Copy Token</base-button>
      </template>
      </card>
    </modal>

  </div>
</template>
<script>
import Device from "../../models/device";
import DeviceService from '../../services/device.service';

export default {
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
      currentDevice: new Device('',''),
      modals: {
        modal_token: false
      },
      // currentProject: null,
      // currentIndex: -1,
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
    refreshList() {
      this.retrieveDevices();
      this.currentDevice = null;
      this.currentIndex = -1;
    },
    deleteProject(id) {
      DeviceService.delete(id)
        .then((response) => {
          console.log(response);
          this.retrieveDevices();
        })
        .catch((e) => {
          console.log(e);
        });
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
    }
  },
  mounted() {
    this.retrieveDevices();
  },
};
</script>
<style></style>
