<template>
  <div>
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="min-height: 600px;">
      <!-- Mask -->
      <span class="mask bg-gradient-success opacity-8"></span>
      <!-- Header container -->
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Hello {{currentUser.username}}</h1>
            <p class="text-white mt-0 mb-5">
              Ini adalah halaman profil. Anda bisa melihat informasi profil dan edit profil anda.
            </p>
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <card shadow type="secondary">
        <template v-slot:header>
          <div class="bg-white border-0">
            <div class="row align-items-center">
              <div class="col-8">
                <h3 class="mb-0">My account</h3>
              </div>
            </div>
          </div>
        </template>

        <form>
          <h6 class="heading-small text-muted mb-4">User information</h6>
          <div class="pl-lg-4">
            <div class="row">
              <div class="col-lg-4">
                <base-input
                  alternative=""
                  disabled
                  label="Username"
                  placeholder="Username"
                  input-classes="form-control-alternative"
                  v-model="model.username"
                />
              </div>
              <div class="col-lg-2 align-self-center">
                <base-button outline type="primary" @click="modals.change_password = true">
                  Ganti Password
                </base-button>
              </div>
              <div class="col-lg-6">
                <base-input
                  alternative=""
                  disabled
                  label="Email address"
                  placeholder="jesse@example.com"
                  input-classes="form-control-alternative"
                  v-model="model.email"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-lg-8">
                <base-input
                  alternative=""
                  disabled
                  label="Full name"
                  placeholder="Full name"
                  input-classes="form-control-alternative"
                  v-model="currentUser.full_name"
                />
              </div>
              <div class="col-lg-2">
                <base-input
                  alternative=""
                  label="Role"
                  placeholder="Role"
                  input-classes="form-control-alternative"
                  disabled
                  v-model="currentUser.role"
                />
              </div>
              <div class="col-lg-2 align-self-center">
                <base-button type="primary" @click="editProfileModal()">
                  Edit profil
                </base-button>
              </div>
            </div>
          </div>
        </form>
      </card>
    </div>

    <modal v-model:show="modals.change_password">
      <template v-slot:header>
        <h5 class="modal-title">Ganti password</h5>
      </template>
      <div class="text-center">
        <base-input formClasses="input-group-alternative mb-3"
                    placeholder="Password baru"
                    type="password"
                    v-model="model.pass">
        </base-input>
        <base-input formClasses="input-group-alternative mb-3"
                    placeholder="Ulangi password baru"
                    type="password"
                    v-model="model.confirmPass">
        </base-input>
      </div>
      <template v-slot:footer>
        <base-button type="secondary" @click="modals.change_password = false">Batal</base-button>
        <base-button type="primary">Ganti Password</base-button>
      </template>
    </modal>

    <modal v-model:show="modals.profile_edit">
      <template v-slot:header>
        <h5 class="modal-title">Edit Profil</h5>
      </template>
      <div>
        <form role="form">
          <base-input formClasses="input-group-alternative mb-3"
                    label="Username"
                    placeholder="Username"
                    v-model="edit.username">
          </base-input>
          <base-input formClasses="input-group-alternative mb-3"
                      label="Email"
                      placeholder="Email"
                      v-model="edit.email">
          </base-input>
          <base-input formClasses="input-group-alternative mb-3"
                      label="Full Name"
                      placeholder="Full Name"
                      v-model="edit.fullName">
          </base-input>
        </form>
      </div>
      <template v-slot:footer>
        <base-button type="secondary" @click="modals.profile_edit = false">Batal</base-button>
        <base-button type="primary">Update</base-button>
      </template>
    </modal>

  </div>
</template>
<script>
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
export default {
  components: { BaseInput, BaseButton },
  name: "user-profile",
  data() {
    return {
      model: {
        username: "",
        email: "",
        pass: "",
        confirmPass: "",
        fullName: ""
      },
      edit: {
        username: "",
        email: "",
        fullName: ""
      },
      modals: {
        change_password: false,
        profile_edit: false
      }
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    this.retrieveProfile();
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    retrieveProfile() {
      this.model.username = this.currentUser.username;
      this.model.email = this.currentUser.email;
    },
    editProfileModal() {
      this.edit.username = this.model.username;
      this.edit.email = this.model.email;
      this.edit.fullName = this.model.fullName;
      this.modals.profile_edit = true;
    }
  }
};
</script>
<style></style>
