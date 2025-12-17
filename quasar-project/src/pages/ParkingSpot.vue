<template>
  <q-card flat bordered class="column items-center q-pa-md spot-card" @click="handleClick">
    <q-icon :name="icon" :color="color" size="56px" class="q-mb-sm"/>
    <div class="text-subtitle1 text-bold">{{ typeLabel }}</div>

    <q-badge :color="badgeColor" class="q-mt-xs" align="middle">
      {{ statusLabel }}
    </q-badge>

    <div v-if="spot.taken && spot.taken_at" class="text-caption q-mt-xs">
       {{ timePassed(spot.taken_at) }}
    </div>
  </q-card>
</template>

<script>
import { api } from '../boot/api'

export default {
  props: {
    spot: { type: Object, required: true },
    currentUser: { type: Object, default: null }
  },
  data() {
    return {
      timer: 0
    }
  },
  computed: {
    userId() {
      return this.currentUser?.id || localStorage.getItem('guest_id')
    },
    isMine() {
      return this.spot.taken_by == this.userId
    },
    icon() { return this.spot.taken ? 'directions_car' : 'local_parking' },
    color() { return this.spot.taken ? 'negative' : 'positive' },
    badgeColor() { return this.spot.taken ? 'red-5' : 'green-5' },
    statusLabel() { return this.spot.taken ? (this.isMine ? 'Vaše' : 'Zauzeto') : 'Slobodno' },
    typeLabel() {
      if (this.spot.type === 'vip') return 'VIP'
      if (this.spot.type === 'invalid') return 'Invalid'
      return 'Student'
    }
  },
  methods: {
    timePassed(takenAt) {
      const takenTime = new Date(takenAt).getTime()
      const now = Date.now()
      let diff = Math.floor((now - takenTime) / 1000) 

      const hours = String(Math.floor(diff / 36000)).padStart(2, '0')
      diff %= 3600
      const minutes = String(Math.floor(diff / 60)).padStart(2, '0')
      const seconds = String(diff % 60).padStart(2, '0')

      return `${hours}:${minutes}:${seconds}`
    },
    async handleClick() {
      try {
        if (!this.spot.taken) {
          if (this.spot.type === 'vip' && this.currentUser?.role !== 'vip') {
            return this.$q.notify({ type: 'warning', message: 'Nemate pravo na VIP mjesto' })
          }
          if (this.spot.type === 'invalid' && this.currentUser?.role !== 'invalid') {
            return this.$q.notify({ type: 'warning', message: 'Nemate pravo na invalid mjesto' })
          }
          await api.post(`/parking/${this.spot.id}/occupy`)
        } else if (this.isMine) {
          await api.post(`/parking/${this.spot.id}/release`)
        } else {
          this.$q.notify({ type: 'warning', message: 'Mjesto je zauzeto' })
        }

        this.$emit('refresh')
      } catch (err) {
        this.$q.notify({ type: 'negative', message: err.response?.data?.message || 'Greška' })
      }
    }
  }
}
</script>

<style scoped>
.spot-card {
  width: 120px;
  border-radius: 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.spot-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
}
</style>
