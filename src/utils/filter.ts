import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

Vue.filter('moment', function(dataStr: number, pattern: string = 'YYYY-MM-DD HH:mm:ss') {
  return moment(new Date(Number(dataStr)), pattern)
})
