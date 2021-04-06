<template>
  <v-footer padless class="player">
    <v-progress-linear
      v-model="currentAudioProgress"
      height="15"
    ></v-progress-linear>
    <v-container>
      <v-row justify="center">
        <v-icon> mdi-skip-backward </v-icon>
        <v-icon style="margin: 0 15px" large @click="playOrPause()">{{
          played ? 'mdi-pause' : 'mdi-play'
        }}</v-icon>
        <v-icon> mdi-skip-forward </v-icon>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import { mapState } from 'vuex'
import { Howl } from 'howler'
export default {
  data() {
    return {
      played: false,
      sound: this.newHowl(''),
      currentAudioProgress: 0,
    }
  },
  computed: {
    ...mapState({
      currentAudio: (state) => state.currentAudio,
      currentPlaylist: (state) => state.currentPlaylist,
    }),
  },
  watch: {
    currentAudio() {
      let audio = ''
      if (this.currentPlaylist.length !== 0) {
        audio = this.currentPlaylist[this.currentAudio].src
      }
      this.sound = this.newHowl(audio)
    },
    currentPlaylist() {
      let audio = ''
      if (this.currentPlaylist.length !== 0) {
        audio = this.currentPlaylist[this.currentAudio].src
      }
      this.sound = this.newHowl(audio)
    },
    sound() {
      this.sound.on('end', () => {
        console.log(this.sound)
      })
    },
  },
  methods: {
    playOrPause() {
      if (this.currentPlaylist.length !== 0) {
        this.played ? this.sound.pause() : this.sound.play()
        this.played = !this.played
      }
    },

    newHowl(src) {
      function step() {
        const sound = this.sound
        const seek = this.seek() || 0
        this.currentAudioProgress = (seek / sound.duration()) * 100
        if (sound.playing()) {
          step()
        }
      }
      return new Howl({
        src: [src],
        onplay() {
          step().bind(this)
        },
        onseek() {
          step().bind(this)
        },
      })
    },
  },
}
</script>

<style scoped>
.player {
  position: fixed;
  bottom: 0;
  background: #272727;
  width: 100%;
  z-index: 100;
  height: 70px;
}
</style>
