import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'
//中文配制
Validator.addLocale(zh);
const config = {
  locale: 'zh_CN',
};
//修改默认错误提示
const dictionary = {
    zh_CN: {
      messages: {
        email: () => '邮箱格式不正确哦',
        required: ( field )=> field + '必须输入'
      }
    }
};
Validator.updateDictionary(dictionary);
Validator.extend('tel', {
    messages: {
      zh_CN:field => '请输入正确的手机号'
    },
    validate: value => {
      return /^[1][3,4,5,7,8][0-9]{9}$/.test(value);
    }
});

Validator.extend('pwd', {
    messages: {
      zh_CN:field => '密码由8-16位组成（包含字母、数字、符号中至少2种）'
    },
    validate: value => {
      return /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,16}$/.test(value);
    }
});

Vue.use(VeeValidate,config);