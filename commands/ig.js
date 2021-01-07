const fetch = require("node-fetch")
const cheerio = require("cheerio")

module.exports = {
	name: 'ig',
	aliases: ['insta', 'instagram'],
	description: 'Embeds an instagram link.',
	args: true,
	usage: '<instagram link>',
	execute(message, args, keyv) {
		
		console.log('try fetch ' + args);

		fetch(args).then(res => res.text())
		.then(html => {

			console.log(html);
		    const $ = cheerio.load(html)
		    const title = $("a[class='sqdOP yWX7d     _8A5w5   ZIAjV ']")[0]
		    const thumbnail = $("img[data-testid='user-avatar']")[0]

		    console.log(title ? title : "no title")
		    console.log(thumbnail ? thumbnail : "no thumbnail")

		    const instaEmbed = new Discord.MessageEmbed()
				.setColor('#000000')
				.setTitle(title)
				.setURL(args)
				.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
				.setDescription('Some description here')
				.setThumbnail(thumbnail.src)
				.addFields(
					{ name: 'Regular field title', value: 'Some value here' },
					{ name: '\u200B', value: '\u200B' },
					{ name: 'Inline field title', value: 'Some value here', inline: true },
					{ name: 'Inline field title', value: 'Some value here', inline: true },
				);

			message.channel.send(instaEmbed);
		});
	},
};