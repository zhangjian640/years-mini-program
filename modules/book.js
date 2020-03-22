import { HTTP } from '../utils/http-p'

class BookModel extends HTTP {
  getBookHotList() {
    return this.request({
      url: 'book/hot_list'
    })
  }
  getMyBookCount() {
    return this.request({
      url: 'book/favor/count'
    })
  }
  getDetail(id) {
    return this.request({
      url: `book/${id}/detail`
    })
  }
  getLikeStatus(id) {
    return this.request({
      url: `book/${id}/favor`
    })
  }
  getComments(id) {
    return this.request({
      url: `book/${id}/short_comment`
    })
  }
  postComment(id, comment) {
    return this.request({
      url: `book/add/short_comment`,
      method: 'post',
      data: {
        book_id: id,
        content: comment
      }
    })
  }
  search(start, q){
    return this.request({
      url: 'book/search',
      data: {
        start,
        q
      }
    })
  }
}

export default BookModel