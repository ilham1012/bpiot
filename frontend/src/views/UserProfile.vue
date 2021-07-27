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
                  label="Username"
                  placeholder="Username"
                  input-classes="form-control-alternative"
                  v-model="currentUser.username"
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
                  label="Email address"
                  placeholder="jesse@example.com"
                  input-classes="form-control-alternative"
                  v-model="currentUser.email"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <base-input
                  alternative=""
                  label="Full name"
                  placeholder="Full name"
                  input-classes="form-control-alternative"
                  v-model="currentUser.firstName"
                />
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
                    v-model="model.pass">
        </base-input>
        <base-input formClasses="input-group-alternative mb-3"
                    placeholder="Ulangi password baru"
                    v-model="model.confirmPass">
        </base-input>
      </div>
      <template v-slot:footer>
        <base-button type="secondary" @click="modals.change_password = false">Batal</base-button>
        <base-button type="primary">Ganti Password</base-button>
      </template>
    </modal>

  </div>
</template>
<script>
import BaseInput from '../components/BaseInput.vue';
export default {
  components: { BaseInput },
  name: "user-profile",
  data() {
    return {
      model: {
        username: "",
        email: "",
        pass: "",
        confirmPass: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        country: "",
        zipCode: "",
        about: "",
      },
      modals: {
        change_password: false
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
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
<style></style>
