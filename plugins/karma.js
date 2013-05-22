/*
 * @Plugin 			Karma
 * @Description 	Issues karma points to users.
 * @Trigger 		<nick>++
 *
 * @Author 			Killswitch (Josh Manders)
 * @Website 		http://www.joshmanders.com
 * @Copyright 		Josh Manders 2013
 *
 */

Plugin = exports.Plugin = function (irc) {
	this.irc = irc;
};

Plugin.prototype.onMessage = function(message) {
	var nick = (this.irc.user(message.prefix) || '').toLowerCase(),
		channel = message.arguments[0],
		msg = message.arguments[1];
	if (user = msg.match(/^(\w+)\+\+;?(.+)?$/i))
	{
		this.give(this.irc, channel, nick, user[1], user[2]);
	}
};

Plugin.prototype.give = function (irc, channel, nick, user, reason) {
		if ((reason !== undefined) && (reason.substr(0,4) === 'for'))
		{
			var why = reason.replace('for', '');
		}
		else
		{
			var why = reason;
		}
		irc.send(channel, nick + ': Karma has been given to ' + user + ((reason === undefined) ? '.' : ' for ' + why.trim() + '.'));
};