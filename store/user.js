import ajax from '@/assets/scripts/ajax'


export const mutations = {
    setData(state, payload) {
        state[payload.key] = payload.value
    },
}
export const actions = {
    // 需要token
    async getUser({ commit }) {
        const { data } = await ajax.get('/user')
        commit('setData', {
            key: 'user',
            value: data,
        })
    },
    // 用户列表，后台展示
    async getUsers({ commit }) {
        const { data } = await ajax.get('/users')
        commit('setData', {
            key: 'users',
            value: data,
        })
    },
    async login({ commit, dispatch }, body) {
        const { success } = await ajax.post('/login', body)
        if (success) {
            await dispatch('getUser')
        }
        return success
    },
    async logout({ commit }) {
        await ajax.post('/logout')
        commit('setData', {
            key: 'user',
            value: {},
        })
    },
    async register({ commit }, data) {
        return await ajax.post('/user', data)
    },
    async patchUser({ commit }, user) {
        return await ajax.patch('/user', user)
    },
    async patchPassword({ commit }, body) {
        const { data, success } = await ajax.patch('/user/password', body)
        commit('setData', {
            key: 'user',
            value: data,
        })
        return success
    },
    async getCompreCode({ commit }) {
        const { data } = await ajax.get('/get-img-verify')
        commit('setData', {
            key: 'userauthCode',
            value: data,
        })
    },
    async validetephonenum({ commit }, body) {
        const { data, success } = await ajax.patch('/user/validetephonenum', body)
        commit('setData', {
            key: 'phonenum',
            value: data,
        })
        return success
    },
}

export const state = () => ({
    user: {},
    users: [],
    otherUser: {},
    userauthCode: {},
})
