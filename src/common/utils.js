// 防抖函数
export function debounce(fn, delay) {
  let timer = null
  return function(...args) {
    // 第二次调用时已经有timer值,不管到没到延时时间(到了清除也没事),就先清除上一个要执行的定时器(避免了多次执行fn函数)
    if (timer) clearInterval(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}