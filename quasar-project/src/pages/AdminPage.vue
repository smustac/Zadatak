<template>
  <q-page class="q-pa-md">

    <h2>Svi korisnici</h2>

    <q-table
      :rows="users"
      :columns="columns"
      row-key="id"
      bordered
      flat
    />

  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])
const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'username', label: 'Username', field: 'username', align: 'left' },
  { name: 'email', label: 'Email', field: 'email', align: 'left' }
]

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3306/api/users')
    users.value = response.data
  } catch (err) {
    console.error('Failed to fetch users:', err)
  }
})
</script>
