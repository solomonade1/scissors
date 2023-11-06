<template>
  <Header  />
    <v-container>
    <v-row>
      <v-col cols="6" class="d-none d-md-block pa-0 half-bg m-auto">
        <div class="fill-height d-flex justify-center align-center">
          <img src="/svg/login.svg" class="fullHeight" />
        </div>
      </v-col>
      <v-col cols="6" class="m-auto px-6">
        <form @submit.prevent="handleRegister">
          <v-row>
            <v-col cols="12">
              <h2
                class="text-transparent text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text lg:text-6xl sm:text-4xl font-bold"
              >
                Scissors <span class="text-h4">Register</span>
              </h2>
            </v-col>
            <v-col cols="12">
              <InputTextField
                type="email"
                placeholder="JohhDoe@gmail.com"
                v-model="form.email"
                label="Email"
              />
            </v-col>
            <v-col cols="12">
              <InputTextField
                placeholder="JohhDoe"
                v-model="form.username"
                label="Username"
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
              <v-btn size="x-large" type="submit"> Register </v-btn>

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

<script setup lang="ts">
  let rememberMe = true;
  import { useAuthStore } from "~/stores/useAuthStore";
import { definePageMeta } from "#imports";

definePageMeta({
  middleware: ["guest"],
});

const form = ref({
  email: "",
  username: "",
  password: "",
});

const errorMessage = ref("");

const auth = useAuthStore();

async function handleRegister() {
  console.log("FORM =>", form.value);
  const { error } = await auth.register(form.value);
  if (!error.value) {
    return navigateTo("/login");
  }
  // console.log("User =>", error);

  if (error && error.value) {
    console.log("ERROR => ", error.value.data.message);
    errorMessage.value = error.value.data.message;
  }

  
}
</script>

<style scoped></style>
