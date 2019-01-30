import axios from 'axios'

export const state = () => ({
  all: []
})

export const mutations = {
  uploadSpictsImage (state, { Items }) {
    state.all = Items.map(item => item.url.S)
  }
}

export const actions = {
  async uploadSpictsPieceImage({ commit }, { file }) {
    if (!file) {
      console.log('fileがありません')
      return
    } 
    const response = await axios.get('https://api.spicts.net/s3_image_upload')
    await axios.put(response.data.url, file, {
      headers: { "Content-Type": "image/jpeg" }
    })
    await axios.post('https://api.spicts.net/post_piece_image', {
      url: response.data.key,
      id: response.data.key
    })
  },
  async getSpictsPieceImage({ commit }) {
    const { data } = await axios.get('https://api.spicts.net/get_piece_image')
    commit('uploadSpictsImage', data.data)
  }
}