<template>
  <div class="appWrapper">
    <HeaderPage />
    <v-container class="mainContent">
      <router-view />
    </v-container>
    <FooterPage />
  </div>
</template>
<script lang="ts" setup>
import HeaderPage from "./components/HeaderPage.vue"
import FooterPage from "./components/FooterPage.vue"
</script>

<style scoped>
.appWrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.mainContent {
  flex-grow: 1;
}
</style>
