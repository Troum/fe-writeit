export default {
    setOverlay({ commit }, data) {
        commit('SET_OVERLAY', data)
    },
    setResponse({ commit }, data) {
        commit('SET_RESPONSE', data)
    },
    setUser({ commit }, data) {
        commit('SET_USER', data)
    },
    setToken({ commit }, data) {
        commit('SET_TOKEN', data)
    },
    setIsDashboard({ commit }, data) {
        commit('SET_IS_DASHBOARD', data)
    }
}
