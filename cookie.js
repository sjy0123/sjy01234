const http = require('http')
const qs = require("querystring")
const server = http.createServer()
server.on('request',(req,res)=>{
    if(req.url==='/'){
        // let cookie = {}
        // req.headers.cookie &&  //&&如果req.headers.cookie 为真 则返回下一步,为假返回它自己,不执行下一步
        //   req.headers.cookie.split('; ').forEach(item => {
        //     const parts = item.split('=')
        //     cookie[parts[0]] = parts[1]
        // })
        // console.log(cookie)
        // 使用parse解析cookie
        console.log(req.headers.cookie);
        var cookie = qs.parse(req.headers.cookie,'; ')
        console.log(cookie);
    // //
        if(cookie[' isvisit'] =='yes'){
        res.writeHeader(200,{
            'Content-Type' : 'text/html; charset=utf-8'
        })
         res.end('不是第一次来')
        }
    else{
        // 之前没有访问过服务器
      const expiresTime = new Date(Date.now() + 10 * 1000).toUTCString()
      res.writeHeader(200,{
        'Content-Type': 'text/html; charset=utf-8',
    //  'Set-Cookie': ['isvisit=yes; expires=' + expiresTime, 'test=ook']
    'Set-Cookie': ['isvisit=yes;expires='+ expiresTime,'test=ook']
      })
      res.end('第一次登录')
    }
}else{
    res.end("err")
}
  
})

server.listen(3000,()=>{
 console.log("http://127.0.0.1:3000")
})