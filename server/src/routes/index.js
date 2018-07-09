'use strict'

import compose from 'koa-compose'
import Router from 'koa-router'
import importDir from 'import-dir'

const routerConfigs = [
  { folder: 'api', prefix: '/api' },
]

export default function routes(socket) {
  const composed = routerConfigs.reduce((prev, curr) => {
    const routes = importDir('./' + curr.folder)
    const router = new Router({
      prefix: curr.prefix,
    })
    Object.keys(routes).map(name => {
        return routes[name](router,socket)
    })

    return [router.routes(), router.allowedMethods(), ...prev]
  }, [])

  return compose(composed)
}
