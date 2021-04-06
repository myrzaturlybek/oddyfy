<template>
  <v-container>
    <v-list>
      <v-list-item-group v-model="model">
        <v-list-item
          v-for="(beat, index) in album"
          :key="beat.title"
          @click="play({ beat: index, album: album })"
        >
          <v-list-item-icon>
            <v-icon v-text="'mdi-play'"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="beat.title"></v-list-item-title>
            <v-list-item-subtitle v-text="beat.artist"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      album: [
        {
          title: 'sasygan it1',
          artist: 'oddy',
          src: 'http://localhost:3000/m1.mp3',
          pic: 'http://localhost:3000/02.jpg',
        },
        {
          title: 'sasygan it2',
          artist: 'oddy',
          src: 'http://localhost:3000/m1.mp3',
          pic: 'http://localhost:3000/02.jpg',
        },
      ],
      model: 1,
    }
  },
  methods: {
    ...mapActions(['play']),
  },
}
</script>
