const { SuccessModel, ErrorModel } = require('../model/responseModel')
const { getList, getDetail, createNewBlog, updateBlog, deleteBlog } = require('../controllers/blog')

const handleBlogRoute = (req, res) => {
  // 定义处理路由的逻辑
  const method = req.method
  if (method === 'GET' && req.path === '/api/blog/list') {
    // api/blog/list?author=lwt&keyword=123
    const { author, keyword } = req.query
    const listData = getList(author, keyword)
    return new SuccessModel(listData)
  }
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const { id } = req.query
    const detailData = getDetail(id)
    return new SuccessModel(detailData)
  }
  if (method === 'POST' && req.path === '/api/blog/new') {
    const postData = req.body
    const newBlogData = createNewBlog(postData)
    return {
      message: '新建博客的接口'
    }
  }
  if (method === 'POST' && req.path === '/api/blog/update') {
    const postData = req.body
    const updateData = updateBlog(postData)
    return new SuccessModel(req.body)
  }
  if (method === 'POST' && req.path === '/api/blog/delete') {
    const id = req.body
    const newBlogData = deleteBlog(id)
    return {
      message: '删除博客的接口'
    }
  }
}
module.exports = handleBlogRoute
