export default {
  // 移动端判断
  isMobile() {
    if (navigator.userAgent.match(/(iPhone|iPod|Android|ios|SymbianOS)/i)) {
      return true
    }
  }
}
