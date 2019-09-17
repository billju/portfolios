export const state = () => ({
    language: 'zh'
})

export const mutations = {
    setLanguage(state, payload){ 
        state.language = payload
    }
}