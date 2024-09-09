<template>
<div>


    <v-navigation-drawer app :right="true" permanent>
      <v-list-item >
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            اپلیکیشن Scrapper
          </v-list-item-title>
          <v-list-item-subtitle>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item link to="/robots"
        >
          <v-list-item-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>ربات ها</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/executes"
        >
          <v-list-item-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>اجرا ها</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</div>
</template>