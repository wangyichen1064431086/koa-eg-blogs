//<https://github.com/koajs/examples/tree/master/blog>

const render = require('./lib/render');

const logger = require('koa-logger');
/**
 * development style logger
 * <https://github.com/koajs/logger>
 */

const router = require('koa-router')();
/**
 * RESTful resource router. RESTful风格的路由中间件
 * <https://github.com/alexmingoia/koa-router>
 */

const koaBody = require('koa-body');
/**
 * koa body parser middleware.用于解析body的koa中间件
 * <https://github.com/dlau/koa-body>
 */


const Koa = require('koa');
const app = new Koa();

//database
const posts = [];

//middleware
app.use(logger());

app.use(render);

app.use(koaBody());

// route definitions
router.get('/', list)
  .get('/post/new', add)
  .get('/post/:id', show)
  .post('/post', create);// /post路由为new.html文件提交表单的action地址

app.use(router.routes());


// Post listing
async function  list(ctx) {
  await ctx.render('list', {
    posts: posts//使用数据posts渲染list.html文件（渲染引擎是swig在render.js中指定。
  })
}

// Show creation form
async function add(ctx) {
  await ctx.render('new'); //渲染静态(无数据的)new.html文件
}

// Show post :id
async function show(ctx) {
  const id = ctx.params.id;//QUEST：该值为什么就是url里面的参数id
  const post = posts[id];
  if(!post) {
    ctx.throw(404, 'invalid post id');
  }
  await ctx.render('show', {//用post数据渲染show.html
    post: post
  })
}

// Create a post
async function create(ctx) {
  //本来是提交到/post但是提交之后会重定向到/
  const post = ctx.request.body;//来自new.html的表单的数据
  const id = posts.push(post) - 1;//NOTE:push方法将一个或多个元素添加到数组的末尾，并返回新数组的长度
 post.created_at = new Date();
 post.id = id;
 ctx.redirect('/');//同response.redirect,重定向到/
 //如果删去这句话，那么就直接得到/post路由，这个路由只是处理表单，却没有返回任何内容，所以会显示Not Found页面
}

//listen
app.listen(3000);




