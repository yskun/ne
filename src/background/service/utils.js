// 工具类
export function timestampToTime(timestamp, formats) {
  // formats格式包括
  // 1. Y-m-d
  // 2. Y-m-d H:i:s
  // 3. Y年m月d日
  // 4. Y年m月d日 H时i分
  formats = formats || 'Y-m-d H:i:s';

  const zero = function (value) {
      if (value < 10) {
          return '0' + value;
      }
      return value;
  };

  const myDate = timestamp * 1000 ? new Date(timestamp * 1000): new Date();

  const year = myDate.getFullYear()
  const month = zero(myDate.getMonth() + 1)
  const day = zero(myDate.getDate())

  const hour = zero(myDate.getHours())
  const minite = zero(myDate.getMinutes())
  const second = zero(myDate.getSeconds())

  return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
      return ({
          Y: year,
          m: month,
          d: day,
          H: hour,
          i: minite,
          s: second
      })[matches]
  })
}

 // 求交集
export function getInterSection(arr1, arr2) {
  const a = new Set(arr1)
  const b = new Set(arr2)
  const arr = [...new Set([...a].filter(v => b.has(v)))]
  return arr
}

// 求差集
export function getDifferenceSet(arr1, arr2) {
  const a = new Set(arr1)
  const b = new Set(arr2)
  const arr = [...new Set([...a].filter(v => !b.has(v)))]
  return arr
}

// 数组去重
export function removeArrRepeat(arr) {
  return [...new Set(arr)]
}

// 根据对象key值进行排序
export function objKeySort(arys) {
  //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  var newkey = Object.keys(arys).sort();　　
  //console.log('newkey='+newkey);
  var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
  for(var i = 0; i < newkey.length; i++) {
      //遍历newkey数组
      newObj[newkey[i]] = arys[newkey[i]];
      //向新创建的对象中按照排好的顺序依次增加键值对

  }
  return newObj; //返回排好序的新对象
}
