var mongoose = require('mongoose');
mongoose.connect('mongodb://123.57.143.189:27017/zrytodo');
//定义一个模型并导出
module.exports = mongoose.model('todo',mongoose.Schema({
    text:String
}))