<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-container fluid>

      <router-view />
    </v-container>

  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>
@font-face {
  font-family: "Shabnam";
  src: url("./assets/fonts/Shabnam-Light-FD.ttf") format("truetype");
  font-weight: 100;
}

@font-face {
  font-family: "Shabnam";
  src: url("./assets/fonts/Shabnam-Thin-FD.ttf") format("truetype");
  font-weight: 300;
}

@font-face {
  font-family: "Shabnam";
  src: url("./assets/fonts/Shabnam-Medium-FD.ttf") format("truetype");
  font-weight: 500;
}

@font-face {
  font-family: "Shabnam";
  src: url("./assets/fonts/Shabnam-FD.ttf") format("truetype");
  font-weight: 700;
}

@font-face {
  font-family: "Shabnam";
  src: url("./assets/fonts/Shabnam-Bold-FD.ttf") format("truetype");
  font-weight: 900;
}

* {
  font-family: Shabnam, serif !important;
}
</style>