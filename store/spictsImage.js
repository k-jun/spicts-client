import axios from 'axios'

export const state = () => ({
  all: [],
  message: '',
  createdMosaicArtPath: ''
})

export const mutations = {
  getSpictsPieceImage (state, { Items }) {
    state.all = Items.map(item => item.url.S).reverse()
  },
  uploadSpictsImageMessage (state, { message }) {
    state.message = message
  },
  createMosaicArt(state, { path } ) {
    state.createdMosaicArtPath = path
  }
}

export const actions = {
  async uploadSpictsPieceImage({ commit }, { file }) {
    if (!file) {
      commit('uploadSpictsImageMessage', { message: 'ファイルがありません' })
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
    commit('uploadSpictsImageMessage', { message: '画像をアップロードしました' })
  },
  async getSpictsPieceImage({ commit }) {
    const { data } = await axios.get('https://api.spicts.net/get_piece_image')
    commit('getSpictsPieceImage', data.data)
  },
  async createMosaicArt({ commit }, { mainImagePath, pieceImagePaths }) {
    const params = `?piece_image_paths=${pieceImagePaths.join(',')}&main_image_path=${mainImagePath}`
    const { data } = await axios.post(`https://9h47rivt3j.execute-api.ap-northeast-1.amazonaws.com/default/spicts-lambda` + params)
    commit('createMosaicArt', { path: data.path })
  }
}