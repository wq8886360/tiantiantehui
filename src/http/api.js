import { post, get } from "./config";

export const codeList = params => get('/member/register/codeList', params); //推荐人列表
export const sendSmsCode = params => post('/member/common/sendSmsCode', params); //发送验证码
