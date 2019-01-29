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
    const response = await axios.get('http://spicts-api-lb-1610064489.ap-northeast-1.elb.amazonaws.com/s3_image_upload')
    await axios.put(response.data.url, file, {
      headers: { "Content-Type": "image/jpeg" }
    })
    await axios.post('http://spicts-api-lb-1610064489.ap-northeast-1.elb.amazonaws.com/post_piece_image', {
      url: response.data.key,
      id: response.data.key
    })
  },
  async getSpictsPieceImage({ commit }) {
    const { data } = await axios.get('http://spicts-api-lb-1610064489.ap-northeast-1.elb.amazonaws.com/get_piece_image')
    commit('uploadSpictsImage', data.data)
  }
}