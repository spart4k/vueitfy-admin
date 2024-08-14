export const isManager = (ctx) => {
  return ctx.store.state.user.permission_id === 1
}
export const isCUP = (ctx) => {
  return ctx.store.state.user.permission_id === 2
}
export const isDirector = (ctx) => {
  return ctx.store.state.user.permission_id === 3
}
export const isDBA = (ctx) => {
  return ctx.store.state.user.permission_id === 4
}
export const isWR = (ctx) => {
  return ctx.store.state.user.permission_id === 5
}
export const isOBD = (ctx) => {
  return ctx.store.state.user.permission_id === 7
}
export const isOKK = (ctx) => {
  return ctx.store.state.user.permission_id === 8
}
export const isRG = (ctx) => {
  return ctx.store.state.user.permission_id === 9
}
export const isSNAB = (ctx) => {
  return ctx.store.state.user.permission_id === 10
}
export const isCallCenter = (ctx) => {
  return ctx.store.state.user.permission_id === 11
}
export const isBuhg = (ctx) => {
  return ctx.store.state.user.permission_id === 12
}
export const isBrigadir = (ctx) => {
  return ctx.store.state.user.permission_id === 13
}
export const isSpecDop = (ctx) => {
  return ctx.store.state.user.permission_id === 14
}
export const isRukfil = (ctx) => {
  return ctx.store.state.user.permission_id === 15
}
export const isRMU = (ctx) => {
  return ctx.store.state.user.permission_id === 16
}
export const isROKK = (ctx) => {
  return ctx.store.state.user.permission_id === 17
}
export const isShtatAdmin = (ctx) => {
  return ctx.store.state.user.permission_id === 18
}
export const isSMU = (ctx) => {
  return ctx.store.state.user.permission_id === 19
}
export const isDeloproiz = (ctx) => {
  return ctx.store.state.user.permission_id === 20
}
export const isMisha = (ctx) => {
  return ctx.store.state.user.permission_id === 21
}
export const isRukBuh = (ctx) => {
  return ctx.store.state.user.permission_id === 22
}

//

export const isAllBug = (ctx) => {
  return isRukBuh(ctx) || isBuhg(ctx)
}
