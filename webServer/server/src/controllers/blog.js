const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: '标题1',
      content: '内容1',
      author: 'lwt',
      createdAt: 1700213412896
    },
    {
      id: 2,
      title: '标题2',
      content: '内容2',
      author: 'lwt',
      createdAt: 1700215412896
    }
  ]
}

const getDetail = id => {
  return {
    id,
    title: '标题1',
    content: '内容1',
    author: 'lwt',
    createdAt: 1700213412896
  }
}

const createNewBlog = (blogData = {}) => {}
const updateBlog = (id, blogData = {}) => {}
const deleteBlog = id => {}
module.exports = {
  getList,
  getDetail,
  createNewBlog
}
