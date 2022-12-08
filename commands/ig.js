/*//const userInstagram = require("user-instagram");
//const axios = require('axios');
//const fetch = require("node-fetch")
//const cheerio = require("cheerio")

const puppeteer = require('puppeteer')
const Discord = require('discord.js');
const DESC_LENGTH = 50;
const EMOJI_ARRAY = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']

module.exports = {
	name: 'ig',
	aliases: ['insta', 'instagram'],
	description: 'Embeds an instagram post.',
	args: true,
	usage: '<full instagram link or instagram post ID (the 11 characters code at the end of the link)>',
	execute(message, args, redis) {
		
		console.log('try fetch ' + args);

		const argArray = args[0].split('/');
		let code;
		if (argArray.length == 1)
		{
			//console.log('just the code');
			code = argArray[0];
		}
		else
		{
			//console.log('full link');
			code = argArray[argArray.indexOf('p')+1];
		}
		//console.log('code is : ' + code);
		console.log('link is : ' + 'https://www.instagram.com/p/' + code + '/');

		(async () => {
		  	const browser = await puppeteer.launch({
            	'slowMo': 250,
		  		'args' : [
				    '--no-sandbox',
				    '--disable-setuid-sandbox'
		  		]
			});

		  	const page = await browser.newPage();
		  	
		  	//await page.goto('https://www.instagram.com/')
		    //console.log('-> RECHERCHE bouton cookie')
		    //const [button2] = await page.$x("//button[contains(., 'Accepter')]");
		    //if (button2) {
		    //        console.log('-> TROUVE bouton cookie')
		    //        await button2.click()
		    //}
		    //else {
		    //  console.log('-> NON TROUVE bouton cookie ')
		    //}
		    
		    let picURL = 'https://www.instagram.com/p/' + code + '/media/?size=l'
	        await page.goto(picURL);

		  	console.log('goto url : ', picURL);
		  	console.log('result url : ', page.url());

		  	await browser.close();
		})();
		

		
		fetch('https://www.instagram.com/p/' + code + '/').then(res => res.text())
		.then(html => {
		    console.log(html)
		    const $ = cheerio.load(html)
		    const title = $("div[class=swiper-wrapper]")
		    console.log('1 : ' + title)
		    const titleText = $(title).find('a').text();
		    console.log('2 : ' + titleText)

		    const author = $("div[class='user']").find('div a img');
		    console.log(author);
		    console.log(author.attr('alt'));
		    console.log(author.attr('src'));

		    const imageURLs = $("div[class='downloads']").find('a').map(function() {
		    	const str = $(this).attr('href').slice(0, -5);
		    	console.log(str);
		    	return str;
		    }).get()

		    const desc = $("div[class='desc']").text();

		    let picMaxString = '';
			for (let i = 1; i < imageURLs.length; i++) {
				picMaxString += i + ' ';
			}

		    const instaEmbed = new Discord.MessageEmbed()
				.setColor('#833AB4')
				.setTitle(titleText)
				.setURL('https://www.instagram.com/p/' + code)
				.setAuthor(author.attr('alt'), author.attr('src'), 'https://www.instagram.com/' + author.attr('alt'))
				.setDescription((desc.length > DESC_LENGTH) ? desc.substring(0, DESC_LENGTH) + '...' : desc)
				.setImage(imageURLs[0]);

			if (imageURLs[0].split('/').includes('e35'))
			{
				instaEmbed.fields = [];
				instaEmbed.setImage(imageURLs[0])
					.setFooter('Picture 0️⃣ ' + picMaxString, 'https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png');
			}
			else 
			{
				const videoThumb = $("video[src='" + imageURLs[0] + "']");
				instaEmbed.setImage(videoThumb.attr('poster')).addField('Video', '[link](' + imageURLs[0] + ')', true)
					.setFooter('Picture 0️⃣ ' + picMaxString, 'https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png');
			}
			//const collectors = new ReactionCollector();

			message.channel.send(instaEmbed).then(async function(newMessage) {
				
				if (imageURLs.length > 1)
				{
					imageURLs.forEach(async function(element, index) 
					{
						await newMessage.react(EMOJI_ARRAY[index]);
						try {
							const filter = (reaction, user) => {
								return reaction.emoji.name === EMOJI_ARRAY[index];
							};

							let picNumString = '';
							for (let i = 0; i < imageURLs.length; i++) {
								if (i == index)
								{
									picNumString += EMOJI_ARRAY[i] + ' ';
								}
								else 
								{
									picNumString += i + ' ';
								}
							}

							
							//console.log('create collector');
							let collector = await newMessage.createReactionCollector(filter, { time: 1000000 });
							collector.on('collect', async function (reaction, user) 
							{
								collector.resetTimer();
								//console.log('reaction ');
								if (imageURLs[index].split('/').includes('e35'))
								{
									instaEmbed.fields = [];
									instaEmbed.setImage(imageURLs[index])
										.setFooter('Picture ' + picNumString, 'https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png');
								}
								else 
								{
									instaEmbed.fields = [];
									const videoThumb = $("video[src='" + imageURLs[index] + "']");
									//console.log('video ' + videoThumb);
									instaEmbed.setImage(videoThumb.attr('poster')).addField('Video', '[link](' + imageURLs[index] + ')', true)
										.setFooter('Picture ' + picNumString, 'https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png');
								}

								newMessage.edit(instaEmbed);


								const userReactions = await newMessage.reactions.cache.filter(reaction => {
									//console.log(reaction.count);
									return (reaction.count > 0);
								});
								try {
									//console.log(userReactions + ' try ' + userReactions);
									for (const reaction of userReactions.values()) {
										reaction.users.cache.forEach(async function(user, index)
										{
											//console.log(user.id + ' vs ' + newMessage.author.id);
											if (user.id != newMessage.author.id)
											{
												//console.log(' a+ ');
												await reaction.users.remove(user);
											}
										});
									}
								} catch (error) {
									console.error(error);
								}
							});

							collector.on('end', (collected, reason) => {
								console.log(collected);
								// TODO : remove reactions
					        });
							
		
							

						} catch (error) {
							console.error(error);
						}
					});
				}
			});
		});
	},

};*/