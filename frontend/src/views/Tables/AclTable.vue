<template>
  <div>
    <h5 class="pl-3 heading-small text-muted">{{ title }}</h5>

    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush table-hover"
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
              @click="deleteAcl(row.item.id)"
            >
              Delete
            </base-button>
            <base-button
              nativeType="button"
              type="primary"
              size="sm"
              @click="showUpdate(row.item.id)"
            >
              Update
            </base-button>
          </td>
        </template>
      </base-table>
    </div>
   <modal v-model:show=" update_acl"
           body-classes="p-0"
           modal-classes="modal-dialog-centered modal-sm">
      <card type="secondary" shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0">

       
          <h3 class="modal-title mb-3 text-center" id="modal-title-default">New ACL</h3>
        
        <form role="form" name="form" @submit.prevent="updateAcl">
          <label for="">MQTT</label>  
          <label for="">Pattern</label>
          <div class="radio custom-control custom-radio custom-control-alternative">
            <div>
              <input type="radio" name="mqtt" id="pub" value="true" v-model="Acl.pub"> 
              <label for="pub">Publish</label>
            </div>
            <div>
              <input type="radio" name="mqtt" id="sub" value="false" v-model="Acl.pub">
              <label for="sub">Subscribe</label>
            </div>   
          </div>
          <div class="custom-control custom-radio custom-control-alternative">  
          </div>      
          <base-input formClasses="input-group-alternative mb-3"
                      placeholder="Publish"
                      
                      v-model="Acl.pattern">
          </base-input>
          <!-- <base-input formClasses="input-group-alternative mb-3"
                      placeholder="Number"
                      type="number"
                      v-model="device_id">
          </base-input> -->
          
          
          <div class="text-center">
            <base-button type="primary" class="my-4" native-type="submit">Update ACL</base-button>
          </div>
        </form>

      </card>
    </modal>
    <modal v-model:show="delete_acl"
           ref="modal_delete_device"
           body-classes="p-0"
           modal-classes="modal-dialog-centered modal-sm">
      <card type="secondary" shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0">
      
          <h3 class="modal-title mb-3" id="modal-title-default">Delete Acl?</h3>
          <div class="text-center">
            <base-button
              nativeType="button"
              type="danger"
              size="sm"
              @click="deleteAcl"
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
import Acl from '../../models/acl';
import AclService from '../../services/acl.service';
import deviceService from '../../services/device.service';


export default {
  name: "acl-table",
  props: {
    type: {
      type: String,
    },
    title: String,
    acls: Array,
  },
  data(){
    return {
      id : "",
      delete_acl : false,
      update_acl : false,
      Acl : new Acl("",""),
    }
  },
  methods:{
    deleteAcl(id) {
      AclService.delete(id)
        .then((response) => {
          console.log(response);
          this.retrieveAcls()
         
        })
        .catch((e) => {
          console.log(e);
        });
    },
    popUpDelete(id){
      this.delete_acl = true;
      this.id = id;
    },
    showUpdate(id){

      this.update_acl = true;
      this.id = id;
      // AclService.get(id)
      //   .then(response => {
      //     this.Acl = response.data;
      //     console.log(response.data);
      //   })
      //   .catch(e => {
      //     console.log(e);
      //   });
      
    },
    updateAcl(){
     
      console.log("Update Device");
      console.log(this.Acl);
      this.Acl.device_id = this.device.id
      AclService.update(this.id, this.Acl)
        .then(response => {
          console.log(response.data);

          console.log("Device Berhasil Diupdate");

       
          this.update_acl = false;
        })
        .catch(e => {
          console.log(e);
        });
    },
    async retrieveAcls() {

      console.log("retrieve Acl");

      AclService.get(this.$route.params.id)
        .then((response) => {
          
          const acls = response.data;
          
          acls.forEach(acl => {
            console.log(acl)
            if (acl.pub){
              this.pub_acls.push(acl);
            } 
            else {
              this.sub_acls.push(acl);
            }
          });

          

        })
        
        .catch((e) => {
          
          console.log(e);
        });
    },
    async retrieveDevice() {
      console.log("retrieve device");
      
      deviceService.get(this.$route.params.id)
        .then((response) => {
          this.device = response.data;
          console.log(this.device);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    // this.retrieveNewAcls();
    this.retrieveDevice()
      .then(this.retrieveAcls())
  },
 
  
    
};
</script>
<style></style>
