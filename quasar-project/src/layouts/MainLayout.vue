<template>
<q-layout view="lHh Lpr lFf">


<q-header elevated class="bg-primary text-white">
<q-toolbar>
<q-toolbar-title>Smart Parking</q-toolbar-title>


<q-btn flat dense label="Login" @click="$router.push('/')" />
<q-btn flat dense label="Registracija" @click="$router.push('/register')" />


</q-toolbar>
</q-header>


<q-page-container>
<router-view />
</q-page-container>


</q-layout>
</template>


<script>
export default { name: 'MainLayout' };
</script>