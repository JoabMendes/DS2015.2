//Server code

var chorus = 'chorus' ;

//modules
var express = require('express');
var app = express();

var mongojs = require('mongojs');

var http = require('http'),
    https = require('https'),
    bodyParser = require('body-parser');
    validator = require('validator');

var log4js = require('log4js');

app.use(bodyParser());
app.disable('x-powered-by');

//Generated services
var computeServices = require('./compute_v1_0');

//Connection to MongoDB (local)
var databaseUrl = "chorus" //chorus; // "username:password@example.com/mydb"
var collections = ["instances"]
var db = mongojs(databaseUrl, collections);




log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: 'logs/'+chorus+'.log', maxLogSize:20480, backups:3, category: chorus }
  ]
});

var logger = log4js.getLogger();
logger.setLevel('TRACE');

//Process Admin Router
var pr = express.Router();
app.use('/'+chorus+'/calculateArea', pr);

//Services Router
var sr = computeServices.ServiceRouter() ;
app.use('/services/compute', sr);


//activity paths
var processName = 'calculateArea' ;
var processVersion = 'v1' ;
logger.warn('------------ Process Endpoints ---------------');
var calculateArea_calculateRectangleArea_receive = '/'+processName+'/'+processVersion+'/receive/calculateRectangleArea' ;
logger.warn('[ENDPOINT] calculateArea_calculateRectangleArea_receive') ;
var calculateArea_calculateArea_invoke = '/'+processName+'/'+processVersion+'/invoke/calculateArea' ;
logger.warn('[ENDPOINT] calculateArea_calculateArea_invoke') ;
logger.warn('\n------------ Admin Console -------------------');
logger.warn('[ENDPOINT] /chorus/calculateArea/util/instances') ;
logger.warn('\n------------ Server started ------------------');

//Root structure of a process instance
function Process(name, version,request) {
    this.name = name ;
    this.version = version ;
    //this.receive = request ;
    this.sequence = { "receive" : request } ;
    var d = new Date();
    this.startTime = d.getTime() ;
}

pr.use(function(req, res, next) {
  // .. some logic here .. like any other middleware

  next();
});


pr.get('/util/events', function(req, res, next) {
  // ..
  var output = '<p>Process: calculateArea</p>'
  //output += '<p>'+ JSON.stringify(collection) +'</p>' ;
  res.send(output);
  next();
});

pr.get('/util/instances', function(req, res, next) {
  // ..
    var pid = req.query.id ;

    var output = '<p>Process: calculateArea</p>'

    if (pid === undefined) {
        var collection = db.instances.find(function(err, instances) {
        if (err || !instances) {
        	logger.warn("no instance found") ;
        	res.send("no instance found");
        } else {
            output += '<p>found '+instances.length+' records</p>'
 			output += '<table><tbody><tr><th>id</th><th>status</th><th>last activity</th></tr>'
            instances.forEach(function(instance) {
                output += '<tr><td><a href="instances/'+instance._id+'">'+instance._id+'</a></td><td><a href="instances/state/'+instance.status+'">'+instance.status+'</a></td><td>'+instance.last+'</td></tr>' ;
            });
            output += '</tbody></table>';   //note foreach is blocking
            res.send(output);
        }
    }); //end find-function
    } else {
        next() ;
     }
});

pr.get('/util/instances/:id', function(req, res, next) {
  // ..
  var pid = req.param("id") ;
  var output = '<h2>Process: calculateArea</h2>'
  output += '<p>Looking for process instance:'+ pid +'</p>' ;
  if (pid !== null) {
      db.instances.findOne({
          _id:mongojs.ObjectId(pid)
      }, function(err, doc) {
          if (doc !== null) {
          output += '<p>found instance:'+ pid +'</p>' ;
          output += '<p>'+JSON.stringify(doc)+'</p>';
          res.send(output);
          } else {
          		logger.warn('process id:'+pid+' not found');
                res.send(404,output+"<p>process instance not found, please check instance ID</p>");
          }
      });
  } else {
      next() ;
  }

});

pr.get('/util/instances/state/:state', function(req, res, next) {
  // ..
    var state = req.param("state") ;

    var output = '<h2>Process: calculateArea<br/>state: '+state+'</h2>'
    var query = { status : state} ;
    if (state !== null) {
        var collection = db.instances.find( query, function(err, instances) {
        if (err || !instances) {
        	logger.warn("no instances found") ;
        	res.send(output);
        } else {
                output += '<p>found '+instances.length+' records</p>'
                output += '<table><tbody><tr><th>id</th><th>status</th><th>last activity</th></tr>'
                instances.forEach(function(instance) {
                    output += '<tr><td><a href="instances/'+instance._id+'">'+instance._id+'</a></td><td>'+instance.status+'</td><td>'+instance.last+'</td></tr>' ;
                });
                output += '</tbody></table>';
                res.send(output);
             }
            });

    } else {
        next() ;
     }
});


app.post(calculateArea_calculateRectangleArea_receive, function(req, res){
  var output = '{ "process": "calculateArea"' ;
  var processInstance = new Process('calculateArea','1',req.body) ;
  db.instances.save(processInstance, function(err,savedInstance) {
      if (err || !savedInstance) {
          var error = "Process<calculateArea> instantiation error" ;
          logger.error(error);
          res.send(output+', "err" : "'+error+'"}');
      }
      else {
       	  savedInstance.status = "running" ;
      	  savedInstance.pid = savedInstance._id ;
      	  var pid = savedInstance._id ;
          var input = req.body.input ;
          savedInstance.vars = {} ;
savedInstance.vars.input = input ;
savedInstance.vars.output = "" ;
savedInstance.vars.values = "" ;
savedInstance.vars.area = "" ;
          db.instances.save(savedInstance) ;
          logger.trace("[RECEIVE] request<pid:"+savedInstance._id+"> input:"+JSON.stringify(input));

          assignInputToValues(input, pid, res, output) ;

      }
  }) ;
});

function assignInputToValues(arg, pid, res, output) {
	logger.trace("[ASSIGN] start InputToValues");
    db.instances.findOne({
        _id:mongojs.ObjectId(pid)
    }, function(err, doc) {
    	if (err || (doc === null)) {
    		logger.warn("[ASSIGN] values") ;
    	} else {

//WARNING Feature level assignments are not supported yet
var __values = doc.vars.input ;
doc.vars.values = __values ;
doc.last = "assignInputToValues" ;
db.instances.save(doc) ;
logger.trace("[ASSIGN] values = "+JSON.stringify(doc.vars.input));

		invokeCalculateArea(__values, pid, res, output) ;
		logger.trace("[ASSIGN] exit");
	}});
}

function invokeCalculateArea(arg,pid,reply,output) {

    logger.trace('[INVOKE] CalculateArea');

    var options = {
      hostname: '127.0.0.1',
      port: 3000,
      path: '/calculateArea/v1/invoke/calculateArea',
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    };

    //Invoke the next activity
    var invoke = http.request(options, function(res) {
      logger.trace('[INVOKE] result from invoking private endpoint: CalculateArea');
      logger.trace('[INVOKE] returned { STATUS: ' + res.statusCode + ', HEADERS: ' + JSON.stringify(res.headers)+'}');
      res.setEncoding('utf8');
      res.on('data', function (data) {
          //Pass control to the next activity
          assignAreaToOutput(data,pid,reply,output) ;
      });
    });

    invoke.on('error', function(e) {
      logger.error('problem with request: ' + e.message);
    });

    var request = '{ "processid" : "'+pid+'", "payload" : '+JSON.stringify(arg)+'}' ;
    // write data to request body
    logger.trace('[INVOKE] request : '+ request);
    invoke.write(request);
    invoke.end();

}

//Private endpoint for
app.post(calculateArea_calculateArea_invoke, function(req,invokeres) {

	var requestData = {} ;
var values = req.body.payload ;
requestData.values = req.body.payload ;
logger.trace("[INVOKE] request<pid:"+pid+"> values:"+JSON.stringify(values)) ;
    var pid = req.body.processid ;

    db.instances.findOne({
        _id:mongojs.ObjectId(pid)
    }, function(err, doc) {
        logger.trace('found process instance:'+doc.name) ;
        doc.sequence.invoke = { "service" : "http://localhost:3000/services/calculator/multiply/", "request" : requestData } ;
        //would be payload instead of query for a POST
        db.instances.save(doc) ;

   		var multiplyRequest = {} ;
   		multiplyRequest.input = values ;
   		logger.trace("[INVOKE] multiplyRequest: "+JSON.stringify(req.body)) ;

   		//Invoke the service
   		http.get('http://localhost:3000/services/compute/multiply/?a='+multiplyRequest.input.a+'&b='+multiplyRequest.input.b, function(getres) {
            logger.trace("[INVOKE] response code: " + getres.statusCode);

            getres.on("data", function(chunk) {
            var results = eval('(' + chunk + ')');

            db.instances.findOne({
                _id:mongojs.ObjectId(pid)
            }, function(err, doc) {
                logger.trace('[CONTEXT] updating context for process:'+doc.name+' with'+JSON.stringify(results)) ;
                doc.sequence.invoke.response = results.multiplyResponse ;
                var response = {} ;
doc.vars.area = results.multiplyResponse.ouput ;
logger.trace("[INVOKE] response: " + JSON.stringify(results.multiplyResponse.ouput)) ;
response.area = results.multiplyResponse.ouput ;

                db.instances.save(doc, function(err,val) {  //, { writeConcern: { j : 1 }}
                    if (err || !val) logger.error(err+" "+JSON.stringify(val));
                    else {
                        invokeres.send(200,'{ "response" : '+JSON.stringify(response)+' }');
                    }
                });


            });

          });

        }).on('error', function(e) {
          logger.error("[INVOKE] error: " + e.message);
        }).end();
    });
}) ;

function assignAreaToOutput(arg, pid, res, output) {
	logger.trace("[ASSIGN] start AreaToOutput");
    db.instances.findOne({
        _id:mongojs.ObjectId(pid)
    }, function(err, doc) {
    	if (err || (doc === null)) {
    		logger.warn("[ASSIGN] output") ;
    	} else {

//WARNING Feature level assignments are not supported yet
var __output = doc.vars.area ;
doc.vars.output = __output ;
doc.last = "assignAreaToOutput" ;
db.instances.save(doc) ;
logger.trace("[ASSIGN] output = "+JSON.stringify(doc.vars.area));

		replyCalculateRectangleArea(__output,pid, res, output) ;
		logger.trace("[ASSIGN] exit");
	}});
}

function replyCalculateRectangleArea(data,pid,res,output) {
    //update process state
    db.instances.findOne({
        _id:mongojs.ObjectId(pid)
    }, function(err, doc) {
	    output += ', "reply" : { "output" : ' + doc.vars.output + '}}' ;

	    logger.trace("[REPLY] ready to return: "+output) ;

	    //How do we make that separate and synchronized?
	    if (res !== undefined) {
		    res.send(output);

	        if (doc !== undefined) {
	            logger.trace('[CONTEXT] updating context for process:'+doc.name) ;
	            doc.sequence.reply =  doc.vars.output ;
	            var d = new Date();
	            doc.status = "completed" ;
	                            doc.endTime = d.getTime() ;
	            doc.last = "replyCalculateRectangleArea" ;
	            doc.lastTime = d.getTime() ;

	            db.instances.save(doc) ;//, { writeConcern: { j : 1}});

	            logger.trace("[REPLY] returning response: " + JSON.stringify(doc.sequence.reply));
	          } else {
	              logger.warn("[REPLY] problem with doc: " + JSON.stringify(doc));
	          }
	    } else {
	        logger.error("[REPLY] res is undefined") ;
	    }
	});
 }


var server = app.listen(process.env.PORT || 3000, function() {
    logger.warn('[SERVER] listening on port %d', server.address().port);
});
