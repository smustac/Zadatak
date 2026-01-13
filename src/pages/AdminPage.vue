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
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../boot/api'

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
  {
    name: 'actions',
    label: 'Actions',
    align: 'center',
    sortable: false
  }
]

// FETCH USERS
async function fetchUsers () {
  const res = await api.get('/users')
  users.value = res.data
}

onMounted(fetchUsers)

// DELETE USER
async function confirmDelete (userId) {
  if (!window.confirm('Delete this user?')) return

  await api.delete(`/users/${userId}`)
  users.value = users.value.filter(u => u.id !== userId)
}

// CHANGE ROLE
async function confirmRoleChange (userId, newRole) {
  if (!window.confirm(`Change role to "${newRole}"?`)) {
    await fetchUsers()
    return
  }

  await api.put(`/users/${userId}/role`, {
    role: newRole
  })
}
</script>
