<script lang="ts" setup>
import { useAuthStore } from "~/stores/useAuthStore";
import { definePageMeta } from "#imports";

definePageMeta({
  middleware: ["guest"],
});

const form = ref({
  email: "akin@gmail.com",
  password: "1234",
});

const errorMessage = ref("");

const auth = useAuthStore();

async function handleLogin() {
  console.log("FORM =>", form.value);
  const { error } = await auth.login(form.value);

  console.log("User =>", error);

  if (error && error.value) {
    console.log("ERROR => ", error.value.data.message);
    errorMessage.value = error.value.data.message;
  }

  if (!error.value) {
    return navigateTo("/");
  }
}
</script>

<template>
  <Header />
  <v-container>
    <v-row>
      <v-col cols="6" class="d-none d-md-block pa-0 half-bg m-auto">
        <div class="fill-height d-flex justify-center align-center">
          <img src="/svg/login.svg" class="fullHeight" />
        </div>
      </v-col>
      <v-col cols="6" class="m-auto px-6">
        <form @submit.prevent="handleLogin">
          <v-row>
            <v-col cols="12">
              <h2
                class="text-transparent text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text lg:text-6xl sm:text-4xl font-bold"
              >
                Scissors <span class="text-h4">Login</span>
              </h2>
            </v-col>
            <v-col cols="12">
              <InputTextField
                type="email"
                placeholder="JohhDoe"
                v-model="form.email"
                label="Email Or Username"
              />
            </v-col>
            <v-col cols="12">
              <InputTextField
                type="password"
                v-model="form.password"
                label="Password"
              />
            </v-col>
            <v-col>
              <v-btn size="x-large" type="submit"> Login </v-btn>

              <span v-if="errorMessage" style="color: tomato">{{
                errorMessage
              }}</span>
            </v-col>
          </v-row>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.fullHeight {
  height: 85vh;
  max-width: 100%;
  max-height: 100%;
}
</style>
