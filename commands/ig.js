const userInstagram = require("user-instagram");

module.exports = {
	name: 'ig',
	aliases: ['insta', 'instagram'],
	description: 'Embeds an instagram link.',
	args: true,
	usage: '<instagram link>',
	execute(message, args, keyv) {
		
		console.log('try fetch ' + args);

		userInstagram.getPostData('CD9EMe5sHP5')
		  .then(post => console.log('result ' + post))
		  .catch(console.error)



		
	},
};