// /*
//  * @Descripttion: 
//  * @Author: yizheng.yuan
//  * @Date: 2019-08-28 18:06:38
//  * @LastEditors: yizheng.yuan
//  * @LastEditTime: 2021-03-02 23:20:12
//  */
// var express = require('express');
// var app = express();
// var fs = require("fs");
// var path = require('path');


// var bodyParser = require('body-parser');
// var multer  = require('multer');

// // app.use(express.static('public'));

// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(multer({ dest: '/upkkk/'}).array('image'));

// app.get('/', function (req, res) {
//   res.sendFile( __dirname + "/" + "index.html" );
// })
// app.get('/aa', function (req, res) {
//   res.send('asdfs');
// })

// app.post('/file_upload', function (req, res) {

//    console.log('上传的文件sd信息:',req.files[0]);  // 上传的文件信息

//    console.log('当前文件夹路径：',__dirname);

//    console.log('-----------读取当前文件夹下文件---------');
//    var Arr = [];
//    var fileRel;
//    var thedir = path.join(__dirname,'/public');
//    var readAllFileName = function(dir){

//       fs.readdirSync(dir).forEach(
//         function(file){
//           // 判断每个文件是否是文件夹--通过当前路径+文件名
//           var pathname = path.join(dir,file);
//           if(fs.statSync(pathname).isDirectory()){
//             console.log('--是文件夹---',pathname)
//             readAllFileName(pathname)
//           }else{
//             console.log('--是文件lelele---',pathname)
//             Arr.push(pathname);
//           }
//         }
//       )
//      //console.log('-------------等待await-------------',Arr.length)
//      // return new Promise((resolve,reject) =>{
//      //  resolve(Arr)
//      // });
//    }

//    var rel = async function(){
//      await readAllFileName(thedir);
//      console.log('----------------------等待结果323--------:',Arr.length)
//    }
//    rel();

//    var des_file = __dirname + "/upload/" + req.files[0].originalname;
//    console.log('---des_file:',des_file)
//    console.log('---req.files[0].path:',req.files[0].path)

//    fs.readFile( req.files[0].path, function (err, data) {

//         fs.writeFile(des_file, data, function (err) {
//          if( err ){
//               console.log( err );
//               response = {
//                   message:'error'
//               };
//          }else{
//                response = {
//                    message:'File uploaded successfully', 
//                    filename:req.files[0].originalname
//               };
//           }

//           console.log('-----------文件读取完毕---------');
//           console.log( response );
//           res.end( JSON.stringify( response ) );
//        });

//    });
// })

// var server = app.listen(7070, function () {

//   var host = server.address().address
//   var port = server.address().port

//   console.log("应用实例，12访问地址为 http://%s:%s", host, port)

// })



var express = require('express');

var app = express();
const fs = require('fs')
const pathLib = require('path')
// 引入body-parser中间件，用来处理post请求体body中的数据
const bodyParser = require('body-parser')
// 引入multer中间件，用于处理上传的文件数据
const multer = require('multer')


const server = app.listen(7070, function () {
  console.log('express + multer 实现文件上传')
})

app.get('/', function (res, rep) {
  rep.send('Hello, word!');
});

// 读取静态资源
app.use(express.static('public'))
// 通过配置multer的dest属性， 将文件储存在项目下的tmp文件中
app.use(multer({ dest: './tmp/' }).any())

// 访问index.html页面
app.get('/index.html', function (req, res) {
  // 将public下的index.html文件返回去
  res.sendFile(__dirname + '/index.html')
})

// create application/json parser
var jsonParser = bodyParser.json()
// 文件上传接口
app.post('/fileUpload', jsonParser, function (req, res) {
  // 上传的文件在req.files中
  console.log('req12312:', req, req.body.name);
  const filename = req.files[0].path + pathLib.parse(req.files[0].originalname).ext
  console.log(filename);
  fs.rename(req.files[0].path, filename, function (err) {
    if (err) {
      res.send(err)
    } else {
        res.send(
        {
          msg: 'upload successfully',
          filename,
          name: req.body.name
        })
    }
  })
})

// ————————————————
// 版权声明：本文为CSDN博主「在奋斗的大道」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/zhouzhiwengang/article/details/108604811