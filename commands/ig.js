//const userInstagram = require("user-instagram");
//const axios = require('axios');
const fetch = require("node-fetch")
const cheerio = require("cheerio")
const Discord = require('discord.js');
const DESC_LENGTH = 50;
const EMOJI_ARRAY = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']

module.exports = {
	name: 'ig',
	aliases: ['insta', 'instagram'],
	description: 'Embeds an instagram post.',
	args: true,
	usage: '<full instagram link or instagram post ID (the 11 characters code at the end of the link)>',
	execute(message, args, keyv) {
		
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
		//console.log('link is : ' + 'https://imginn.com/p/' + code + '/');


		fetch('https://imginn.com/p/' + code + '/').then(res => res.text())
		.then(html => {
		    //console.log(html)
		    const $ = cheerio.load(html)
		    const title = $("div[class='fullname']")[0]
		    const titleText = $(title).find('a').text();
		    //console.log('2 : ' + titleText)

		    const author = $("div[class='user']").find('div a img');
		    //console.log(author);
		    //console.log(author.attr('alt'));
		    //console.log(author.attr('src'));

			/*
		    const images = $("div[class='downloads']").find('a');
		    console.log(images);
		    const imageURLs = images;
		    images.forEach((element, index) => {
		    	const str = element.attr(href);
		    	console.log(str);
		    	imageURLs[index] = str;
		    })
		    */
		    const imageURLs = $("div[class='downloads']").find('a').map(function() {
		    	const str = $(this).attr('href').slice(0, -5);
		    	//console.log(str);
		    	return str;
		    }).get()

		    const desc = $("div[class='desc']").text();


		    const instaEmbed = new Discord.MessageEmbed()
				.setColor('#833AB4')
				.setTitle(titleText)
				.setURL('https://www.instagram.com/p/' + code)
				.setAuthor(author.attr('alt'), author.attr('src'), 'https://www.instagram.com/' + author.attr('alt'))
				.setDescription((desc.length > DESC_LENGTH) ? desc.substring(0, DESC_LENGTH) + '...' : desc)
				//.setThumbnail('https://i.imgur.com/wSTFkRM.png')
				/*.addFields(
					{ name: 'Regular field title', value: 'Some value here' },
					{ name: '\u200B', value: '\u200B' },
					{ name: 'Inline field title', value: 'Some value here', inline: true },
					{ name: 'Inline field title', value: 'Some value here', inline: true },
				)*/
				//.addField('Inline field title', 'Some value here', true)
				.setImage(imageURLs[0])
				//.setTimestamp()
				.setFooter('Picture 1', 'https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png');

			//const collectors = new ReactionCollector();

			message.channel.send(instaEmbed).then(async function(newMessage) {

				await newMessage.react(EMOJI_ARRAY[0]);
				try {
					const filter = (reaction, user) => {
						return reaction.emoji.name === EMOJI_ARRAY[0];
					};

					
					console.log('create collector');
					let collector = await message.createReactionCollector(filter, { time: 100000 });
					collector.on('collect', (reaction, user) => 
					{
						console.log('reaction ');
						if (imageURLs[0].split('/').contains('e35'))
						{
							instaEmbed.setImage(imageURLs[0]).setFooter('Picture ' + 0, 'https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png');
						}
						else 
						{
							const videoThumb = $("video[src='" + imageURLs[0] + "']");
							console.log('video ' + videoThumb);
							instaEmbed.setImage(videoThumb.attr('poster')).addField('Video', '', true)
								.setFooter('Picture ' + 0, 'https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png');
						}

						newMessage.edit(instaEmbed);
					});
				}
				catch (error) 
				{
					console.error(error);
				}
				/*
				imageURLs.forEach(async function(element, index) {
					await newMessage.react(EMOJI_ARRAY[index]);
					try {
						const filter = (reaction, user) => {
							return reaction.emoji.name === EMOJI_ARRAY[index];
						};

						
						console.log('create collector');
						collector = message.createReactionCollector(filter, { time: 100000 });
						collector.on('collect', (reaction, user) => 
						{
							console.log('reaction ');
							if (imageURLs[index].split('/').contains('e35'))
							{
								instaEmbed.setImage(imageURLs[index]).setFooter('Picture ' + index, 'https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png');
							}
							else 
							{
								const videoThumb = $("video[src='" + imageURLs[index] + "']");
								console.log('video ' + videoThumb);
								instaEmbed.setImage(videoThumb.attr('poster')).addField('Video', '', true)
									.setFooter('Picture ' + index, 'https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png');
							}

							newMessage.edit(instaEmbed);
						});
						
	
						/*
						newMessage.awaitReactions(filter, { time: 100000, errors: ['time'] })
						.then(function(collected) {
							console.log('reaction ' + imageURLs[index]);
							if (imageURLs[index].split('/').includes('e35'))
							{
								instaEmbed.setImage(imageURLs[index]).setFooter('Picture ' + (index+1), 'https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png');
							}
							else 
							{
								const videoThumb = $("video[src='" + imageURLs[index] + "']");
								console.log('video ' + videoThumb);
								instaEmbed.setImage(videoThumb.attr('poster')).addField('Video', '[link](' + imageURLs[index] + ')', true)
									.setFooter('Picture ' + (index+1), 'https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png');
							}

							newMessage.edit(instaEmbed);

							const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has());
							try {
								for (const reaction of userReactions.values()) {
									reaction.users.remove(userId);
								}
							} catch (error) {
								console.error('Failed to remove reactions.');
							}
						})
						.catch(err => console.log('error : ' + err));
						

					} catch (error) {
						console.error(error);
					}
				});*/
			});
		});
		/*
		userInstagram.getPostData('CD9EMe5sHP5')
		  .then(post => console.log('result ' + post))
		  .catch(console.error)
		*/

		/*
		new Promise(async (resolve, reject) => {
		    const URL = shortcode;
		    const REQUEST_PARAMETERS = {
		      method: 'GET',
		      url: URL
		    };
		    axios(REQUEST_PARAMETERS)
		      .then(GQL => {
		        const media_data = GQL.data.graphql.shortcode_media;
		        const has_caption = media_data.edge_media_to_caption.edges.length > 0;
		        resolve({
		          link: URL.replace('/?__a=1', ''),
		          shortcode: media_data.shortcode,
		          dimensions: media_data.dimensions,
		          displayUrl: media_data.display_url,
		          isVideo: media_data.is_video,
		          wasCaptionEdited: media_data.caption_is_edited,
		          caption: has_caption? media_data.edge_media_to_caption.edges[0].node.text : null,
		          commentsCount: media_data.edge_media_to_parent_comment.count,
		          areCommentsDisabled: media_data.comments_disabled,
		          takenAt: media_data.taken_at_timestamp,
		          likesCount: media_data.edge_media_preview_like.count,
		          location: media_data.location ? {
		            id: media_data.location.id,
		            hasPublicPage: media_data.location.has_public_page,
		            name: media_data.location.name,
		            slug: media_data.location.slug,
		            jsonName: media_data.location.address_json,
		          } : null,
		          owner: {
		            id: media_data.owner.id,
		            username: media_data.owner.username,
		            profilePicture: media_data.owner.profile_pic_url,
		            full_name: media_data.owner.full_name,
		            postsCount: media_data.owner.edge_owner_to_timeline_media,
		            followersCount: media_data.owner.edge_followed_by,
		            isPrivate: media_data.owner.is_private,
		            isVerified: media_data.owner.is_verified,
		          },
		          isAnAd: media_data.is_ad,
		          childrenPictures: media_data.edge_sidecar_to_children && media_data.edge_sidecar_to_children.edges ? media_data.edge_sidecar_to_children.edges.map(edge => {
		            return {
		              id: edge.node.id,
		              shortcode: edge.node.shortcode,
		              dimensions: edge.node.dimensions,
		              displayUrl: edge.node.display_url,
		              isVideo: edge.node.is_video
		            }
		          }) : [],
		          comments: media_data.edge_media_to_parent_comment.edges.map(edge => {
		            return {
		              id: edge.node.id,
		              text: edge.node.text,
		              createdAt: edge.node.created_at,
		              author: {
		                id: edge.node.owner.id,
		                isVerified: edge.node.owner.is_verified,
		                username: edge.node.owner.username,
		                profilePicture: edge.node.owner.profile_pic_url
		              },
		              likesCount: edge.node.edge_liked_by.count
		            }
		          }),
		          taggedUsers: (media_data.edge_media_to_tagged_user.edges) ? media_data.edge_media_to_tagged_user.edges.map(tag => {
		            return {
		              fullName: tag.node.user.full_name,
		              id: tag.node.user.id,
		              isVerified: tag.node.user.is_verified,
		              username: tag.node.user.username,
		              tagLocation: {
		                x: tag.node.x,
		                y: tag.node.y
		              }
		            }
		          }) : null
		        });
		      })
		      .catch(() => {
		        reject(UnableToFetchPostDataError.fromShortcode(shortcode));
	      	});

	  	});
		*/
	},

};