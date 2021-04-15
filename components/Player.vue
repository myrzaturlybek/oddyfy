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
    <v-icon @click="repeatSwitch()">{{
      repeat ? 'mdi-repeat' : 'mdi-repeat-off'
    }}</v-icon>
    <v-icon :color="shuffled ? 'success' : ''" @click="shuffleSwitch()"
      >mdi-shuffle-variant</v-icon
    >
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
      playingPlaylist: [],
      repeat: false,
      shuffled: false,
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
    playlist() {
      const playlist = [...this.playlist]
      this.playingPlaylist = playlist
    },
    shuffled() {
      if (this.shuffled) {
        this.playingPlaylist = this.playingPlaylist.sort(
          () => Math.random() - 0.5
        )
        this.$store.commit('currentAudioIndex', -1)
      } else {
        this.playingPlaylist = [...this.playlist]
        const audioIndex = this.playingPlaylist.indexOf(this.audio)
        if (audioIndex !== -1) {
          this.$store.commit('currentAudioIndex', audioIndex)
        }
      }
    },
  },
  methods: {
    playOrPause() {
      if (this.playingAudio.howl) {
        if (this.playingAudio.howl.playing()) {
          this.playingAudio.howl.pause()
          this.played = false
        } else {
          this.playingAudio.howl.play()
          this.played = true
        }
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
        this.playingPlaylist.length !== 0 &&
        this.playingAudio.howl &&
        this.currentAudioIndex < this.playingPlaylist.length - 1
      ) {
        const nextAudioIndexAdd = 1
        const audio = this.playingPlaylist[
          this.currentAudioIndex + nextAudioIndexAdd
        ]
        this.$store.commit('currentAudio', audio)
        this.$store.commit(
          'currentAudioIndex',
          this.currentAudioIndex + nextAudioIndexAdd
        )
      } else if (
        this.currentAudioIndex === this.playingPlaylist.length - 1 &&
        this.repeat
      ) {
        const audio = this.playingPlaylist[0]
        this.$store.commit('currentAudio', audio)
        this.$store.commit('currentAudioIndex', 0)
      }
    },
    prev() {
      if (
        this.playingPlaylist.length !== 0 &&
        this.playingAudio.howl &&
        this.currentAudioIndex > 0
      ) {
        const prevAudioIndex = 1
        const audio = this.playingPlaylist[
          this.currentAudioIndex - prevAudioIndex
        ]
        this.$store.commit('currentAudio', audio)
        this.$store.commit(
          'currentAudioIndex',
          this.currentAudioIndex - prevAudioIndex
        )
      }
    },
    repeatSwitch() {
      this.repeat = !this.repeat
    },
    shuffleSwitch() {
      this.shuffled = !this.shuffled
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
