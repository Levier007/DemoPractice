import service from '@/api/http'

// 定义一个接口，表示对象的类型
interface MyId {
  [key: string]: Number // 允许任意字符串作为 key，值的类型为 number
}
interface UserInfo {
  username: String
  password: String
}
export const getAll = () => {
  return service({
    method: 'get'
  })
}

export const login = (userInfo: UserInfo) => {
  return service({
    url: '/user/login',
    method: 'post',
    data: userInfo
  })
}

export const register = (userInfo: UserInfo) => {
  return service({
    url: '/user/register',
    method: 'post',
    data: userInfo
  })
}
