const { executeSQL } = require('../db/mysql')

const getList = async (author, keyword) => {
  let sql = `select * from blogs where`
  if (author) {
    sql += ` author='${author}'`
  }
  if (keyword) {
    sql += ` and title like '%${keyword}%'`
  }
  const data = await executeSQL(sql)
  return data
}

const getDetail = async id => {
  let sql = `select * from blogs where id='${id}'`
  const data = await executeSQL(sql)
  return data
}

const createNewBlog = async (blogData = {}) => {
  let sql = `insert into blogs (title, content, author, createdAt) values ('${blogData.title}', '${blogData.content}', '${
    blogData.author
  }', ${Date.now()})`
  const data = await executeSQL(sql)
  return data
}
const updateBlog = async (id, blogData = {}) => {
  let sql = `UPDATE blogs SET title='${blogData.title}',content='${blogData.content}',author='${
    blogData.author
  }',createdAt=${Date.now()} WHERE id='${id}'`
  const data = await executeSQL(sql)
  return data
}
const deleteBlog = async id => {
  let sql = `delete from blogs where id='${id}'`
  const data = await executeSQL(sql)
  return data
}
module.exports = {
  getList,
  getDetail,
  createNewBlog,
  updateBlog,
  deleteBlog
}
