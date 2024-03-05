const { SuccessModel, ErrorModel } = require('../model/responseModel')
const { getList, getDetail, createNewBlog, updateBlog, deleteBlog } = require('../controllers/blog')

const handleBlogRoute = async (req, res) => {
  // 定义处理路由的逻辑--路由可根据不同的请求方式和请求地址处理请求
  const method = req.method
  if (method === 'GET' && req.path === '/api/blog/list') {
    // api/blog/list?author=lwt&keyword=123
    const { author, keyword } = req.query
    const listData = await getList(author, keyword)
    return new SuccessModel(listData)
  }
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const { id } = req.query
    const detailData = await getDetail(id)
    return new SuccessModel(detailData)
  }
  if (method === 'POST' && req.path === '/api/blog/new') {
    const postData = req.body
    const newBlogData = await createNewBlog(postData)
    return new SuccessModel(newBlogData)
  }
  if (method === 'POST' && req.path === '/api/blog/update') {
    const postData = req.body
    const updateData = await updateBlog(postData.id, postData.blogData)
    return new SuccessModel(updateData)
  }
  if (method === 'POST' && req.path === '/api/blog/delete') {
    const { id } = req.body
    const deletedData = await deleteBlog(id)
    return new SuccessModel(deletedData)
  }
}
module.exports = handleBlogRoute
