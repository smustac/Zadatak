<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="register-card q-pa-xl">

      <div class="text-center q-mb-lg">
        <q-icon name="person_add" size="48px" color="primary" />
        <h4 class="q-mt-sm q-mb-xs">Napravi profil</h4>
        <p class="text-grey-7">Registrirajte se za početak</p>
      </div>

      <!-- Inputs -->
      <q-input v-model="username" label="Username" filled class="q-mb-md" prepend-icon="person" />
      <q-input v-model="email" label="Email" type="email" filled class="q-mb-md" prepend-icon="email" />
      <q-input v-model="password" type="password" label="Password" filled class="q-mb-lg" prepend-icon="lock" />

      <!-- Nicely positioned checkbox -->
      <div class="q-mb-lg q-pt-sm">
        <q-checkbox
          v-model="isInvalid"
          label="Invalid"
          class="q-mt-none"
        />
      </div>

      
      <q-btn label="Register" color="primary" size="lg" class="full-width q-mb-md" @click="registerUser" />

      
      <div v-if="message" class="q-mt-md text-center">
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

const username = ref('')
const email = ref('')
const password = ref('')
const isInvalid = ref(false)
const message = ref('')

async function registerUser() {
  if (!username.value || !email.value || !password.value) {
    message.value = 'Please fill in all fields'
    return
  }

  try {
    const response = await axios.post('http://localhost:3306/api/register', {
      username: username.value,
      email: email.value,
      password: password.value,
      role: isInvalid.value ? 'Invalid' : 'Student'
    })

    message.value = response.data.message

    
    username.value = ''
    email.value = ''
    password.value = ''
    isInvalid.value = false

  } catch (err) {
    console.error('Registration error:', err)
    message.value = err.response?.data?.message || 'Registration failed'
  }
}
</script>

<style scoped>
.register-card {
  width: 100%;
  max-width: 420px;
  border-radius: 12px;
}
</style>
