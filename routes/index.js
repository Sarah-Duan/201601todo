var express = require('express');
var router = express.Router();
var todoModel = require('../model');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/todos', function(req, res, next) {
  todoModel.find({},function(err,todos){
    if(err){
      res.send({code:0,msg:'查询错误!'});
    }else{
      res.send(todos);
    }
  });
});

router.post('/todos',function(req,res){
  console.log(req.body);
  todoModel.create(req.body,function(err,todo){
    if(err){
      console.log(err);
      res.send({code:0,msg:'添加错误!'});
    }else{
      //把保存到数据库中之后的对象发送给客户端
      res.send(todo);
    }
  });
});

module.exports = router;
