const deepAssign = (target, ...sources) => {
  for (const source of sources) {
    for (const key in source) {
      if (Object.prototype.toString.call(source[key]) === '[object Object]') {
        if (!target[key]) Object.assign(target, { [key]: {} })
        deepAssign(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }
  return target
}

export { deepAssign }
