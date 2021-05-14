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
                </div>
                <v-form>
                  <v-text-field
                    v-model="firstName"
                    name="firstName"
                    label="Имя"
                    type="text"
                    :error="error"
                    :rules="[rules.required]"
                  ></v-text-field>
                  <v-text-field
                    v-model="lastName"
                    name="lastName"
                    label="Фамилия"
                    type="text"
                    :error="error"
                    :rules="[rules.required]"
                  ></v-text-field>
                  <v-text-field
                    v-model="phone"
                    name="phone"
                    label="Телефон"
                    type="text"
                    :error="error"
                    :rules="[rules.required]"
                  ></v-text-field>
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
                <v-btn plain :to="'/login'">Уже есть аккаунт?</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" :loading="loading" @click="register"
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
  auth: 'guest',
  layout: 'default',
  data() {
    return {
      loading: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
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
    async register() {
      const vm = this
      if (!vm.email || !vm.password) {
        vm.result = "Email and Password can't be null."
        vm.showResult = true
        return
      }
      try {
        await this.$axios.post('auth/register', {
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password,
          email: this.email,
          phone: this.phone,
        })
        const login = await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        await this.$auth.setUser(login.data.user)

        this.$router.push('/')
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
