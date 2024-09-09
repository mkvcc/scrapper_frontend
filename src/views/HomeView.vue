<template>
  <div>
    <Sidebase />
    <v-main>

      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Sidebase from '@/components/Sidebase.vue';

export default {
  name: 'Home',

  components: {
    Sidebase
  },
}
</script>
