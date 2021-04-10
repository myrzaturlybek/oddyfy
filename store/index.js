export const state = () => ({
  currentPlaylist: [],
  currentAudio: {},
  currentAudioIndex: 0,
})

export const mutations = {
  currentAudio(state, audio) {
    state.currentAudio = audio
  },
  play(state, playlist) {
    state.currentPlaylist = playlist.album
    state.currentAudio = playlist.beat
    state.currentAudioIndex = playlist.index
  },
}

export const actions = {
  play({ commit }, playlist) {
    commit('play', playlist)
  },
}

export const getters = {
  currentPlaylist: (state) => {
    return state.currentPlaylist
  },
  currentAudio: (state) => {
    return state.currentAudio
  },
  currentAudioIndex: (state) => {
    return state.currentAudioIndex
  },
}
