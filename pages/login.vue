<template>
  <v-app id="login" class="secondary">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <h1 class="flex my-4 primary--text">Oddyfy</h1>
                  <v-card-subtitle>
                    <v-btn plain :to="'register'">Нет аккаунта?</v-btn>
                  </v-card-subtitle>
                </div>
                <v-form>
                  <v-text-field
                    v-model="email"
                    append-icon="person"
                    name="email"
                    label="Email"
                    type="email"
                    :error="error"
                    :rules="[rules.required]"
                  />
                  <v-text-field
                    id="password"
                    v-model="password"
                    :type="hidePassword ? 'password' : 'text'"
                    :append-icon="
                      hidePassword ? 'visibility_off' : 'visibility'
                    "
                    name="password"
                    label="Пароль"
                    :rules="[rules.required]"
                    :error="error"
                    @click:append="hidePassword = !hidePassword"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn plain>Забыли пароль?</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" :loading="loading" @click="login"
                  >Войти</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-snackbar v-model="showResult" :timeout="2000" top>
        {{ result }}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {
      loading: false,
      email: '',
      password: '',
      hidePassword: true,
      error: false,
      showResult: false,
      result: '',
      rules: {
        required: (value) => !!value || 'Required.',
      },
    }
  },
  methods: {
    async login() {
      const vm = this
      if (!vm.email || !vm.password) {
        vm.result = "Email and Password can't be null."
        vm.showResult = true
        return
      }
      try {
        const login = await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        await this.$auth.setUser(login.data.user)

        // this.$router.push('/')
      } catch (e) {
        this.error = e
      }
    },
  },
}
</script>

<style scoped lang="css">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
  z-index: 0;
}
</style>
