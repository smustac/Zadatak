<template>
  <q-page class="q-pa-md">
    <h2>Svi korisnici</h2>

    <q-table
      :rows="users"
      :columns="columns"
      row-key="id"
      bordered
      flat
    >
      <!-- ROLE COLUMN -->
      <template v-slot:body-cell-role="props">
        <q-td :props="props" align="center">
          <q-select
            v-model="props.row.role"
            :options="roleOptions"
            emit-value
            map-options
            dense
            outlined
            style="min-width: 120px"
            @update:model-value="newRole => confirmRoleChange(props.row.id, newRole)"
          />
        </q-td>
      </template>

      <!-- ACTIONS COLUMN -->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" align="center">
          <q-btn
            color="negative"
            label="Delete"
            size="sm"
            dense
            flat
            @click="confirmDelete(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- Logout Button -->
    <q-btn
      label="Logout"
      color="primary"
      class="full-width q-mt-md"
      size="lg"
      @click="logOutUser"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const users = ref([])

const roleOptions = [
  { label: 'Student', value: 'student' },
  { label: 'Invalid', value: 'invalid' },
  { label: 'VIP', value: 'vip' }
]

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'username', label: 'Username', field: 'username', align: 'left' },
  { name: 'email', label: 'Email', field: 'email', align: 'left' },
  { name: 'role', label: 'Role', field: 'role', align: 'center' },
  { name: 'actions', label: 'Actions', align: 'center', sortable: false }
]

// FETCH USERS
async function fetchUsers () {
  try {
    const res = await axios.get('http://localhost:3306/api/users')
    users.value = res.data
  } catch (err) {
    console.error('Failed to fetch users:', err)
  }
}

onMounted(fetchUsers)

// DELETE USER
async function confirmDelete (userId) {
  if (!window.confirm('Delete this user?')) return

  try {
    await axios.delete(`http://localhost:3306/api/users/${userId}`)
    users.value = users.value.filter(u => u.id !== userId)
  } catch (err) {
    console.error('Failed to delete user:', err)
  }
}

// CHANGE ROLE
async function confirmRoleChange (userId, newRole) {
  if (!window.confirm(`Change role to "${newRole}"?`)) {
    await fetchUsers()
    return
  }

  try {
    await axios.put(`http://localhost:3306/api/users/${userId}/role`, {
      role: newRole
    })
  } catch (err) {
    console.error('Failed to update role:', err)
    await fetchUsers()
  }
}

// LOGOUT
function logOutUser() {
  localStorage.removeItem('adminToken')
  router.push('/adminlogin')
}
</script>
