// components/search/index.js
import KeywordModel from '../../modules/keyword.js'
const keywordModel = new KeywordModel()
import BookModel from '../../modules/book.js'
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    books: [],
    searching: false,
    q: '',
    start: 0,
    count: 20,
    hasNext: true,
    loading: false,
    loadingCenter: false,
    empty: false
  },

  attached() {
    this.setData({
      historyWords: keywordModel.getHistory()
    })
    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      if (!this.data.hasNext || !this.data.q || this.data.loading) return
      this.setData({
        loading: true
      })
      this.getBooks(this.data.start + this.data.count, this.data.q)
    },
    onCancel() {
      this.triggerEvent('cancel', {}, {})
    },
    onDelete() {
      this.setData({
        searching: false,
        empty: false,
        q: ''
      })
    },
    getBooks(start, words) {
      keywordModel.addToHistory(words)
      bookModel.search(start, words).then(res => {
        const hasNext = (res.total - (res.start + res.count)) > 0
        const books = this.data.books.concat(res.books)
        this.setData({
          books,
          start: res.start,
          count: res.count,
          hasNext,
          loading: false,
          loadingCenter: false,
          empty: res.count === 0
        })
      }).catch(err => {
        this.setData({
          loading: false,
          loadingCenter: false
        })
      })
    },
    onConfirm(event) {
      const words = event.detail.value || event.detail.text
      if (!words) return
      this.setData({
        searching: true,
        start: 0,
        books: [],
        q: words,
        loadingCenter: true,
        empty: false
      })
      this.getBooks(this.data.start, words)
    }
  }
})
