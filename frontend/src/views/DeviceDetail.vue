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
        <div class="col-xl-8">
          <card shadow type="secondary" class="mb-4">
            <template v-slot:header>
              <div class="bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">Device Information</h3>
                  </div>
                  <div class="col-4 text-right">
                    <a href="#!" class="btn btn-sm btn-primary">Settings</a>
                  </div>
                </div>
              </div>
            </template>

            <form>
              <h6 class="heading-small text-muted mb-4">Basic information</h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-md-8 mb-3">
                    <div>
                      <b>Device name:</b>
                    </div>
                    <div>
                      {{ device.name }}
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <div>                      
                      <b>Device uid:</b>
                    </div>
                    <div>
                      {{ device.uid }}
                    </div>
                  </div>
                  <div class="col-lg-12"><b>Device description:</b></div>
                  <div class="col-md-8 mb-3">{{ device.description }}</div>
                  <div class="col-lg-12"><b>Device token:</b></div>
                  <div class="col-md-8 mb-3">
                    <textarea
                        id="token_area"
                        rows="4"
                        class="form-control form-control-alternative"
                        v-model="device.token"
                    ></textarea>
                  </div>
                  <div class="col-md-2 mb-3">
                    <base-button type="primary" block size="sm" v-if="device.token == null" @click="generateToken(device)">Generate Token</base-button>
                    <base-button type="primary" block size="sm" v-if="device.token != null" data-clipboard-target="#token_area">Copy Token</base-button>
                  </div>
                </div>
                  
              </div>
              <hr class="my-4" />
              <!-- Address -->
              <h6 class="heading-small text-muted mb-4">Project information</h6>
              <div class="pl-lg-4">
                <div class="row">

                  <div class="col-md-8 mb-3">
                    <div>
                      <b>Project name:</b>
                    </div>
                    <div>
                      {{ device.project.name }}
                    </div>
                  </div>
                  
                  <div class="col-md-4 mb-3">
                    <div>                      
                      <b>Project uid:</b>
                    </div>
                    <div>
                      {{ device.project.uid }}
                    </div>
                  </div>

                  <div class="col-lg-12"><b>Project description:</b></div>
                  <div class="col-md-8 mb-3">{{ device.project.description }}</div>
                  
                </div>
              </div>
              <hr class="my-4" />
              <!-- Description -->
              <h6 class="heading-small text-muted">MQTT Access Control</h6>
              <div class="pl-lg-4 pr-lg-4">
                <div class="row">
                  <div class="col-md-8">
                    <p class="text-muted small mb-4">
                      Lists of MQTT Topic which the device have access to. 
                    </p>
                  </div>
                  <div class="col-md-4 text-right">
                    <base-button type="primary" size="sm">New ACL</base-button>
                  </div>
                </div>
              </div>
              <div class="">
                <acl-table title="Publish" :acls="pub_acls" class="mb-4"></acl-table>
                <acl-table title="Subscribe" :acls="sub_acls" class="mb-2"></acl-table>
                
              </div>
            </form>
          </card>
        </div>

        <div class="col-xl-4">
          <card shadow gradient="secondary">
            <template v-slot:header>
              <div class="border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">Telemetry</h3>
                  </div>
                  <div class="col-4 text-right">
                    <a href="#!" class="btn btn-sm btn-primary">Settings</a>
                  </div>
                </div>
              </div>
            </template>

          </card>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import BaseButton from "../components/BaseButton.vue";
import AclTable from "./Tables/AclTable.vue";

import DeviceService from "../services/device.service";
import AclService from '../services/acl.service';

import Device from "../models/device";

export default {
  components: { BaseButton, AclTable },
  name: "device-detail",
  data() {
    return {
      device: new Device("",""),
      pub_acls: [],
      sub_acls: [],
    };
  },
  computed: {
    
  },
  mounted() {
    this.retrieveDevice();
    this.retrieveAcls();
  },
  methods: {
    retrieveDevice() {
      console.log("retrieve device");

      DeviceService.get(this.$route.params.id)
        .then((response) => {
          this.device = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    retrieveAcls() {
      console.log("retrieve Acl");

      AclService.get(this.$route.params.id)
        .then((response) => {
          const acls = response.data;

          acls.forEach(acl => {
            if (acl.pub){
              this.pub_acls.push(acl);
            } else {
              this.sub_acls.push(acl);
            }
          });

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    generateToken(device){
      DeviceService.generateToken(device)
        .then((response) => {
          console.log(response);
          this.device.token = response.data.accessToken;
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
};
</script>