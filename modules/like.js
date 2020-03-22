import { HTTP } from '../utils/http-p'

class LikeModel extends HTTP{
  like(behavior, data) {
    const url = behavior === 'like' ? 'like' : 'like/cancel'
    return this.request({
      url,
      method: 'post',
      data
    })
  }

  getClassicLikeStatus(artId, category) {
    return this.request({
      url: `classic/${category}/${artId}/favor`
    })
  }
}

export default LikeModel
