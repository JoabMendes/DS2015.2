//Define API
//(Web service simulation)

var express = require('express');
var sr = express.Router();

var log4js = require('log4js');

log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: 'logs/compute.log', maxLogSize:20480, backups:3, category: 'services' }
  ]
});

var logger = log4js.getLogger();
logger.setLevel('TRACE');

sr.get('/add', function(req,res) {

					var a = req.query.a ;
				    var b = req.query.b ;
				    var mult = parseFloat(a) + parseFloat(b);
				    res.set( {"Content-Type" : "application/json;charset=UTF-8"} );
				    var respMessage = '{"addResponse":{"ouput":"'+ mult.toString() + '"}}' ;
				    logger.trace("[SERVICE] response from /services/add:"+respMessage);
				    res.send(respMessage);
});


sr.get('/subtract', function(req,res) {

					var a = req.query.a ;
				    var b = req.query.b ;
				    var mult = parseFloat(a) - parseFloat(b);
				    res.set( {"Content-Type" : "application/json;charset=UTF-8"} );
				    var respMessage = '{"subtractResponse":{"ouput":"'+ mult.toString() + '"}}' ;
				    logger.trace("[SERVICE] response from /services/add:"+respMessage);
				    res.send(respMessage);
});


sr.get('/multiply', function(req,res) {
 var a = req.query.a ;
				    var b = req.query.b ;
				    var mult = parseFloat(a) * parseFloat(b);
				    res.set( {"Content-Type" : "application/json;charset=UTF-8"} );
				    var respMessage = '{"multiplyResponse":{"ouput": "'+ mult.toString() + '"}}' ;
				    logger.trace("[SERVICE] response from /services/add:"+respMessage);
				    res.send(respMessage);
});


sr.get('/divide', function(req,res) {

				    var a = req.query.a ;
				    var b = req.query.b ;
				    var mult = parseFloat(a) ;
				    if (parseFloat(b) !== 0) mult = parseFloat(a) / parseFloat(b);
				    res.set( {"Content-Type" : "application/json;charset=UTF-8"} );
				    var respMessage = '{"divideResponse":{"ouput":"'+ mult.toString() + '"}}' ;
				    logger.trace("[SERVICE] response from /services/divide:"+respMessage);
				    res.send(respMessage);
});


sr.get('/square', function(req,res) {

				    var a = req.query.a ;
				    var mult = parseFloat(a)*parseFloat(a);
				    res.set( {"Content-Type" : "application/json;charset=UTF-8"} );
				    var respMessage = '{"squareResponse":{"ouput":"'+ mult.toString() + '"}}' ;
				    logger.trace("[SERVICE] response from /services/square:"+respMessage);
				    res.send(respMessage);
});




exports.ServiceRouter = function() {
    return sr ;
}
