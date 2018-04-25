const views = require('koa-views');
/* 
* Render your views with almost any templating engine
* DOCS:<https://github.com/queckezz/koa-views>
* API: views(root, opts)
  - root: Where your views are located.Must be an absolute path. All rendered views are relative to this path
  - opts(optional)
  - opts.extension: Default extension for your views.
  - opts.map: Map a file extension to an engine.将文件扩展映射到引擎
*/

const path = require('path');

module.exports = views(path.join(__dirname, '/../views'), {
  map: {
    html: 'swig'//swig引擎
    //html:'nunjucks'//nunjucks引擎：以.html结尾的文件将通过nunjucks模板引擎渲染
  }
});