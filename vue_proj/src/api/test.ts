import service from '@/api/http'

// 定义一个接口，表示对象的类型
interface MyId {
  [key: string]: number // 允许任意字符串作为 key，值的类型为 number
}
export const getBlogDetail = (id: MyId) => {
  return service({
    url: '/blog/detail',
    method: 'get',
    params: id
  })
}
