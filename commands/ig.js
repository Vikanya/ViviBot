const fetch = require("node-fetch")
const cheerio = require("cheerio")

module.exports = {
	name: 'guess',
	description: 'Chantier',
	execute(message, args, keyv) {
		
		console.log('try fetch');

		fetch(args).then(res => res.text())
		.then(html => {
		    const $ = cheerio.load(html)
		    const title = $("meta[property='og:title']")[0] || $("meta[name='twitter:title']")
		    const thumbnail = $("img[data-testid='user-avatar']")[0]

		    console.log(title ? title.attribs.content : "no title")
		    console.log(thumbnail ? thumbnail : "no thumbnail")

		    const instaEmbed = new new Discord.MessageEmbed()
				.setColor('#000000')
				.setTitle(title)
				.setURL('https://discord.js.org/')
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