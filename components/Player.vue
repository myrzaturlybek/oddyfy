<template>
  <v-footer padless class="player">
    <!-- <v-progress-linear
      v-model="playingAudioProgress"
      height="13"
      class="progress"
    ></v-progress-linear> -->
    <div id="progressBar">
      <div id="progress"></div>
    </div>
    <div class="audio-info">
      <div class="pic">
        <v-img :width="50" :src="playingAudio.pic" aspect-ratio="1"></v-img>
      </div>
      <div style="padding-left: 7px">
        <p class="font-weight-bold" style="margin-bottom: 0">
          {{ playingAudio.title }}
        </p>
        <p class="subtitle-2">{{ playingAudio.artist }}</p>
      </div>
    </div>

    <v-container>
      <v-row justify="center">
        <v-icon large @click="repeatSwitch()">{{
          repeat ? 'mdi-repeat' : 'mdi-repeat-off'
        }}</v-icon>
        <v-icon large @click="prev()"> mdi-skip-backward </v-icon>
        <v-icon large @click="playOrPause()">{{
          played ? 'mdi-pause' : 'mdi-play'
        }}</v-icon>
        <v-icon large @click="next()"> mdi-skip-forward </v-icon>
        <v-icon
          large
          :color="shuffled ? 'success' : ''"
          @click="shuffleSwitch()"
          >mdi-shuffle-variant</v-icon
        >
      </v-row>
    </v-container>
    <v-slider
      v-model="volume"
      class="volume"
      min="0"
      max="100"
      prepend-icon="mdi-volume-high"
      @change="editVolume"
    ></v-slider>
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
      playingAudioProgress: 0,
      playingAudio: {},
      playingPlaylist: [],
      repeat: false,
      shuffled: false,
      volume: 100,
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
      const self = this
      this.playingAudio.howl = new Howl({
        src: [this.playingAudio.src],
        onplay() {
          // Start upating the progress of the track.
          requestAnimationFrame(self.step.bind(self))
        },
      })

      this.playingAudio.howl.play()
      this.played = true
    },
    step() {
      const self = this

      // Get the Howl we want to manipulate.
      const sound = self.playingAudio.howl

      // Determine our current seek position.
      const seek = sound.seek() || 0
      const progress = document.getElementById('progress')
      progress.style.width = ((seek / sound.duration()) * 100 || 0) + '%'

      // If the sound is still playing, continue stepping.
      if (sound.playing()) {
        requestAnimationFrame(self.step.bind(self))
      }
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
    editVolume() {
      this.playingAudio.howl.volume(this.volume / 100)
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
  height: 70px;
}
#progressBar {
  position: absolute;
  height: 14px;
  width: 100%;
  top: -12px;
  background: forestgreen;
}
#progress {
  position: absolute;
  height: 14px;
  background: fuchsia;
}
.v-icon {
  margin: 0 15px;
}
.pic {
  width: 50px;
  height: 50px;
}
.audio-info {
  position: absolute;
  left: 10px;
  width: 250px;
  display: flex;
  top: 10px;
}
.volume {
  position: absolute;
  right: 30px;
  top: 20px;
  width: 150px;
}
</style>
