<template>
  <v-container>
    <v-list>
      <v-list-item-group>
        <v-list-item
          v-for="(beat, index) in album"
          :key="beat.title"
          @click="play({ beat: beat, album: album, index: index })"
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
  layout: 'app',
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
          src: 'http://localhost:3000/m2.wav',
          pic: 'http://localhost:3000/01.jpg',
        },
        {
          title: 'sasygan it3',
          artist: 'oddy',
          src: 'http://localhost:3000/m3.mp3',
          pic: 'http://localhost:3000/01.jpg',
        },
        {
          title: 'sasygan it4',
          artist: 'oddy',
          src: 'http://localhost:3000/m4.mp3',
          pic: 'http://localhost:3000/01.jpg',
        },
        {
          title: 'sasygan it5',
          artist: 'oddy',
          src: 'http://localhost:3000/m5.mp3',
          pic: 'http://localhost:3000/01.jpg',
        },
        {
          title: 'sasygan it6',
          artist: 'oddy',
          src: 'http://localhost:3000/m6.mp3',
          pic: 'http://localhost:3000/01.jpg',
        },
        {
          title: 'sasygan it7',
          artist: 'oddy',
          src: 'http://localhost:3000/m7.mp3',
          pic: 'http://localhost:3000/01.jpg',
        },
      ],
      // model: 1,
    }
  },
  methods: {
    ...mapActions(['play']),
  },
}
</script>
