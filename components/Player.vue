<template>
  <v-footer padless class="player">
    <v-progress-linear
      v-model="currentAudioProgress"
      height="15"
    ></v-progress-linear>
    {{ audio.title }}
    <v-container>
      <v-row justify="center">
        <v-icon @click="prev()"> mdi-skip-backward </v-icon>
        <v-icon style="margin: 0 15px" large @click="playOrPause()">{{
          played ? 'mdi-pause' : 'mdi-play'
        }}</v-icon>
        <v-icon @click="next()"> mdi-skip-forward </v-icon>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import { mapState } from 'vuex'
import { Howl } from 'howler'
export default {
  props: {
    audio: {
      type: Object,
      default() {
        return {
          beat: {
            title: '',
            artist: '',
            src: '',
            pic: '',
          },
        }
      },
    },
    playlist: {
      type: Array,
      default() {
        return [
          {
            title: '',
            artist: '',
            src: '',
            pic: '',
          },
        ]
      },
    },
  },
  data() {
    return {
      played: false,
      currentAudioProgress: 0,
      playingAudio: {},
    }
  },
  computed: {
    ...mapState({
      currentAudioIndex: (state) => state.currentAudioIndex,
    }),
  },
  watch: {
    audio() {
      const audio = Object.create(this.audio)
      if (this.playingAudio.howl) {
        this.playingAudio.howl.stop()
      }
      this.playingAudio = audio
      this.play()
    },
  },
  methods: {
    playOrPause() {
      if (this.playingAudio.howl) {
        this.playingAudio.howl.playing()
          ? this.playingAudio.howl.pause()
          : this.playingAudio.howl.play()
        this.played = !this.played
      }
    },
    play() {
      this.playingAudio.howl = new Howl({
        src: [this.playingAudio.src],
      })
      this.playingAudio.howl.play()
      this.played = true
    },
    next() {
      if (
        this.playlist.length !== 0 &&
        this.playingAudio.howl &&
        this.currentAudioIndex < this.playlist.length - 1
      ) {
        const nextAudioIndex = 1
        const audio = this.playlist[this.currentAudioIndex + nextAudioIndex]
        this.$store.commit('currentAudio', audio)
        this.$store.commit(
          'currentAudioIndex',
          this.currentAudioIndex + nextAudioIndex
        )
      }
    },
    prev() {
      if (
        this.playlist.length !== 0 &&
        this.playingAudio.howl &&
        this.currentAudioIndex > 0
      ) {
        const prevAudioIndex = 1
        const audio = this.playlist[this.currentAudioIndex - prevAudioIndex]
        this.$store.commit('currentAudio', audio)
        this.$store.commit(
          'currentAudioIndex',
          this.currentAudioIndex - prevAudioIndex
        )
      }
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
