<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" md="6">
        <h1>Welcome</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="8" md="6">
        <h3>Best Works</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="album in albums" :key="album.title" cols="12" sm="6" md="3">
        <v-card :to="album.to" max-width="100%">
          <v-img :src="album.img"></v-img>
          <v-card-title> {{ album.title }} </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      albums: [
        {
          title: 'beatpack #1',
          img: '/01.jpg',
          to: '/albums/1',
        },
        {
          title: 'beatpack #2',
          img: '/02.jpg',
          to: '/albums/2',
        },
      ],
    }
  },
}
</script>
