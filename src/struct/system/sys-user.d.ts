declare namespace SysUserStruct {
  /**
   * 用户模块的对象
   */
  interface sysUser {
    id: number | string;
    avatar: string;
    createBy: string;
    createTime: string;
    loginIp: string;
    phone: string;
    remark: string;
    sex: number | any;
    status: number | any; // 是否禁用
  }
}
