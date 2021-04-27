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
        <div class="col-xl-8 order-xl-1">
          <card shadow type="secondary">
            <template v-slot:header>
              <div class="bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">Device Information {{$route.params.id}}</h3>
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
                        rows="4"
                        class="form-control form-control-alternative"
                        v-model="device.token"
                    ></textarea>
                  </div>
                </div>
                  
              </div>
              <hr class="my-4" />
              <!-- Address -->
              <h6 class="heading-small text-muted mb-4">Project information</h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-md-12">
                    
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-4">
                    
                  </div>
                  <div class="col-lg-4">
                    
                  </div>
                  <div class="col-lg-4">
                    
                  </div>
                </div>
              </div>
              <hr class="my-4" />
              <!-- Description -->
              <h6 class="heading-small text-muted mb-4">About me</h6>
              <div class="pl-lg-4">
                <div class="form-group">
                  <base-input alternative="" label="About Me">
                    <textarea
                      rows="4"
                      class="form-control form-control-alternative"
                      placeholder="A few words about you ..."
                    >
    A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</textarea
                    >
                  </base-input>
                </div>
              </div>
            </form>
          </card>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Device from "../models/device";
import DeviceService from '../services/device.service';

export default {
  name: "device-detail",
  data() {
    return {
      device: new Device("",""),
    };
  },
  computed: {
    
  },
  mounted() {
    this.retrieveDevice();
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
  }
};
</script>