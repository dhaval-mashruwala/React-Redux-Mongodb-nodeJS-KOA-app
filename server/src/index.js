import koa from 'koa'
import middleware from './middleware'
import routes from './routes'
import connectDatabase from './config/db'

const port = process.env.PORT || 8080;
const app = new koa();


// register middlewares
app.use(middleware());
app.use(routes());

(async()=>{
  // connect database
  await connectDatabase();
  // start app on given port
  await app.listen(port)
  console.log(`Server started on port ${port}`)
})()
