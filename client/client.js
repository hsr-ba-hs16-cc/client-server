process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var http = require('http');
var https = require('https');
var HttpsProxyAgent = require('https-proxy-agent');
var proxy = 'proxy-host';
var agent = new HttpsProxyAgent(proxy);
var uuidV4 = require('uuid/v4');

function getOptions(contentLength,path) {
  var options = {
    host: 'host',
    port: '443',
    path: path,
    method: 'POST',
    agent:agent,
    headers: {
      'Host': 'host',
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': '' + contentLength
    }
  };
  return options;
}

function getRequest(contentLength,path) {
  var req = https.request(getOptions(contentLength,path), function(res) {
    var msg = '';

    res.setEncoding('utf-8');
    res.on('data', function(chunk) {
      msg += chunk;
    });

    res.on('end', function() {
      console.log('received: ' + msg);
    });

  });
  return req;
}

function send(data,path) {
  console.log('send: ' + data);
  console.log('path: ' + path);
  var req = getRequest(data.length,path);
  req.write(data);
  req.end();
}

send(new Buffer(uuidV4()).toString('base64'),'/v1/register')

//Send all 30 Seconds a new Request
setInterval(function(){
  send(new Buffer(uuidV4()).toString('base64'),'/v1/count');
},30000)
