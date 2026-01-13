<template>
  <q-card class="glass-card q-pa-lg">
  <q-card-section class="text-center">
    <div class="text-h5 text-white">Prijava</div>
  </q-card-section>

  <q-card-section>
     <h4 class="text-center">Admin login</h4>

    <q-input 
      
      v-model="email"
      label="Email"
      filled
      class="q-mb-md"
      label-color="white"
      input-class="text-white"
    />

    <q-input
      
      v-model="password"
      type="password"
      label="Password"
      filled
      class="q-mb-md"
      label-color="white"
      input-class="text-white"
    />
     <q-card-actions>
      <q-btn
      
      label="Login"
      color="primary"
      class="full-width q-mb-md"
      @click="loginUser"
    />
     </q-card-actions>




    <div v-if="message" class="q-mt-xl text-center">
      <h5>{{ message }}</h5>
    </div>

  </q-card-section>

  
</q-card>

  
</template>

<script setup>
import { ref } from 'vue'
import { api } from '../boot/api'
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
    const response = await api.post('/admin-login', {
      email: email.value,
      password: password.value
    }, { headers: { 'Content-Type': 'application/json' } })

    message.value = response.data.message

    
    router.push('/adminpage')

  } catch (err) {
    console.error('Login error:', err)
    message.value = err.response?.data?.message || 'Login failed'
  }
}


</script>
<style scoped>
  .glass-card {
  width: 100%;
  max-width: 380px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
  color: white;
}


</style>