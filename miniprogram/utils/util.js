const formatTime = date => {
  const year = date.getFullYear()     // 获取年
  const month = date.getMonth() + 1   // 获取月份，月份数值需加1
  const day = date.getDate()          // 获取某月中的某一天
  const hour = date.getHours()        // 获取小时
  const minute = date.getMinutes()    // 获取分钟
  const second = date.getSeconds()    // 获取秒

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, 
    second].map(formatNumber).join(':')   // 后续会单独讲解这段代码的含义
}

const formatNumber = n => {     // 格式化数字
  n = n.toString()    // 将数值类型转为字符串类型，不然不能拼接
  return n[1] ? n : '0' + n   // 三元运算符，如果字符串n的第2位(n[1])存在也就是n至少为2位数，那么直接返回n；如果不存在就给n前面加0
}

module.exports = {      // 获取模块向外暴露的对象，使用require()引用该模块时可以获取
  formatTime: formatTime,
  formatNumber: formatNumber,
}