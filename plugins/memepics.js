/*
 * @Plugin        Meme Pics
 * @Description   Serving up your favorite memes.
 * @Trigger       .brian
 * @Author        cgcardona
 * @Contributor   polar-bear 
 *
 */

Plugin = exports.Plugin = function (irc) {
  irc.addTrigger('brian', this.brian);
};
Plugin.prototype.brian = function (irc, channel, user, params, message) {
  var generatorID;

  if(params < 1)
    irc.send(channel, user + ', Attemps to bad luck brian someone. Forgets to add message.');
  else
  {
    var msg1 = '';
    var msg2 = '';
    if(params[0][0] == '"') {
      var msgNum = 1;
      while(params.length) {
        var p = params.shift();
        var msgNumAfter = false;
        if(p[0] == '"') {
          p = p.substr(1);
        } else if(p[p.length-1] == '"') {
          p = p.substr(0, p.length-1);
          msgNumAfter = true;
        }

        if(msgNum == 1) msg1 += p + " ";
        else msg2 += p + " ";

        if(msgNumAfter) msgNum++;
      }
    } else {
      params.forEach(function(el, inx){
        if(inx <= 4)
          msg1 += el + ' ';
        else
          msg2 += el + ' ';
      });
    }

    msg1 = msg1.trim();
    msg2 = msg2.trim();

    var url = 'http://version1.api.memegenerator.net/Instance_Create?username=w3bt3chirc&password=W3bT3ch1Rc507&languageCode=en&generatorID=740857&imageID=3459374&text0=' + msg1 + '&text1=' + msg2;

    var http = require('http');
    var request = http.get(url, function(res)
    {
      var resp = '';
      res.on('data', function (data) {
        resp += data;
      });

      res.on('end', function () {
        var parsedJSON = JSON.parse(resp);
        irc.send(channel, user + ': ' + parsedJSON.result.instanceImageUrl);
      });
    }).on('error', function(e) {
         console.log("Got error: " + e.message);
    });

    request.end();
  }
};