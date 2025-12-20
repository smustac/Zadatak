<template>
  <q-page class="flex flex-center column q-pa-xl">

    <h2>Admin login</h2>

    <q-input
      v-model="email"
      label="Email"
      filled
      class="q-mb-md"
    />

    <q-input
      v-model="password"
      type="password"
      label="Password"
      filled
      class="q-mb-md"
    />

    <q-btn
      label="Login"
      color="primary"
      class="q-mb-md"
      @click="loginUser"
    />

    <div v-if="message" class="q-mt-xl text-center">
      <h5>{{ message }}</h5>
    </div>

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
    alert('Please fill all fields')
    return
  }

  try {
    const response = await axios.post(
      'http://localhost:3306/api/admin-login',
      {
        email: email.value,
        password: password.value
      },
      { headers: { 'Content-Type': 'application/json' } }
    )

    // ✅ Store token in localStorage
    const token = response.data.token
    localStorage.setItem('adminToken', token)

    // Optional: store admin info too
    localStorage.setItem('adminData', JSON.stringify(response.data.admin))

    message.value = response.data.message

    // ✅ Redirect to admin page
    router.push('/adminpage')

  } catch (err) {
    console.error('Login error:', err)
    message.value = err.response?.data?.message || 'Login failed'
  }
}

// ✅ Optional: Axios interceptor to send token automatically
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('adminToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

</script>
