export function error(ctx,message,data){
  ctx.status = 200
  ctx.body = {
      status: 'error',
      message,
      data
  }
}

export function success(ctx,message,data){
  ctx.status = 200
  ctx.body = {
      status: 'success',
      message,
      data
  }
}
