var express = require('express');
var router = express.Router();
var todoModel = require('../model');

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
//给路由先指定路径，再指定方法，还可以链式调用
router.route('/todos').get(function (req, res, next) {
    todoModel.find({}, function (err, todos) {
        if (err) {
            res.send({code: 0, msg: '查询错误!'});
        } else {
            res.send(todos);
        }
    });
}).post(function (req, res) {
    todoModel.create(req.body, function (err, todo) {
        if (err) {
            res.send({code: 0, msg: '添加错误!'});
        } else {
            //把保存到数据库中之后的对象发送给客户端
            res.send(todo);
        }
    });
});

router.route('/todos/delete').post(function(req,res){
    console.error('ids',ids);
    var ids = req.body;

    todoModel.remove({_id:{$in:ids}},function(err,result){
        if (err) {
            console.log(err);
            res.send({code: 0, msg: '删除失败!'});
        } else {
            res.send({code: 1, msg: '删除成功!'});
        }
    });
})

//删除操作
router.route('/todos/:_id').delete(function(req,res){
    todoModel.remove({_id:req.params._id},function(err,result){
        if (err) {
            res.send({code: 0, msg: '删除失败!'});
        } else {
            //把保存到数据库中之后的对象发送给客户端
            res.send({code: 1, msg: '删除成功!'});
        }
    });
})


module.exports = router;
