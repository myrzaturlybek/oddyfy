export const state = () => ({
  currentPlaylist: [],
  currentAudio: 0,
})

export const mutations = {
  play(state, playlist) {
    state.currentPlaylist = playlist.album
    state.currentAudio = playlist.beat
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
}
