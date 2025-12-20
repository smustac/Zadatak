<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="login-card q-pa-xl">

      <div class="text-center q-mb-lg">
        <q-icon name="lock" size="48px" color="primary" />
        <h4 class="q-mt-sm q-mb-xs">Dobrodošli</h4>
        <p class="text-grey-7">Molimo ulogirajte se</p>
      </div>

      <q-input
        v-model="email"
        label="Email"
        filled
        type="email"
        class="q-mb-md"
        prepend-icon="email"
      />

      <q-input
        v-model="password"
        type="password"
        label="Password"
        filled
        class="q-mb-lg"
        prepend-icon="lock"
      />

      <q-btn
        label="Login"
        color="primary"
        class="full-width q-mb-md"
        size="lg"
        @click="loginUser"
      />

      <q-btn
        label="Admin Access"
        flat
        color="primary"
        class="full-width"
        @click="goToAdmin"
      />

      <q-btn 
        label="Continue as Guest" 
        flat color="primary" 
        class="full-width q-mb-md" 
        @click="loginGuest"/>

      <div v-if="message" class="q-mt-lg text-center">
        <q-banner dense class="bg-grey-3 text-dark">
          {{ message }}
        </q-banner>
      </div>

    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const message = ref('')
const router = useRouter()

async function loginUser() {
  if (!email.value || !password.value) {
    message.value = 'Please fill in all fields'
    return
  }

  try {
    const response = await axios.post(
      'http://localhost:3306/api/login',
      {
        email: email.value,
        password: password.value
      },
      { headers: { 'Content-Type': 'application/json' } }
    )

    message.value = response.data.message
    router.push('/parking')

  } catch (err) {
    console.error('Login error:', err)
    message.value = err.response?.data?.message || 'Login failed'
  }
}

function goToAdmin() {
  router.push('/adminlogin')
}

function loginGuest() {
  localStorage.removeItem('user') 
  router.push('/guest')
}
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 420px;
  border-radius: 12px;
}
</style>
