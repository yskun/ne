import {
  removeArrRepeat
} from './utils'

const USER_TYPE_SUPERADMIN = 1
const USER_TYPE_ADMIN = 2
const USER_TYPE_NORMAL = 3

class Auth {
  userPaths = [] // 包含所有remark
  userType = 0
  // 用户类型为管理员 不可访问的菜单
  adminMenu = ['accesscontrol-role', 'accesscontrol-user']

  init(userPaths) {
    if (!userPaths.length) {
      return
    }
    this.userPaths = []
    userPaths.filter(path => !!path.F_remark).forEach(v => {
      let remark = ''
      try {
        remark = JSON.parse(v.F_remark)
      } catch (error) {
        remark = {}
      }
      if (!remark.web || remark.web.length === 0) {
        return
      }
      remark.web.forEach(v => {
        var prev = []
        v.split('-').forEach(v1 => {
          prev.push(v1)
          this.userPaths.push(prev.join('-'))
        })
      })
    })
    this.userPaths = removeArrRepeat(this.userPaths)
  }

  isCheck(alias) {
    if (this.userType === USER_TYPE_SUPERADMIN) {
      return true
    }
    if (this.userType === USER_TYPE_ADMIN) {
      return !this.adminMenu.includes(alias)
    }
    return this.userPaths.includes(alias)
  }
}

export const auth = new Auth()
