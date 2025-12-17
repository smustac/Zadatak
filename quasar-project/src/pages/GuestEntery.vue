<template>
  <q-page class="flex flex-center q-pa-xl bg-grey-2">
    <q-card class="q-pa-xl shadow-8" style="max-width: 420px; width: 100%;">
     
      <div class="text-center q-mb-lg">
        <q-icon name="local_parking" size="64px" color="primary" />
        <h4 class="q-mt-md q-mb-xs">Gost Ulaz</h4>
        <p class="text-grey-7">
          Parking će biti naplaćen prilikom ulaska.
        </p>
      </div>

      <q-btn
        label="Nastavi na parking"
        color="primary"
        size="lg"
        unelevated
        class="full-width q-mt-md"
        icon-right="arrow_forward"
        @click="$router.push('/parking')"
      />
    </q-card>
  </q-page>
</template>

<script>
export default {};
</script>
