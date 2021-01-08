//const userInstagram = require("user-instagram");
//const axios = require('axios');
const fetch = require("node-fetch")
const cheerio = require("cheerio")
const Discord = require('discord.js');

module.exports = {
	name: 'ig',
	aliases: ['insta', 'instagram'],
	description: 'Embeds an instagram post.',
	args: true,
	usage: '<full instagram link or instagram post ID (the 11 character code at the end of the link)>',
	execute(message, args, keyv) {
		
		console.log('try fetch ' + args);

		const argArray = args[0].split('/');
		let code;
		if (argArray.length == 1)
		{
			console.log('just the code');
			code = argArray[0];
		}
		else
		{
			console.log('full link');
			code = argArray[argArray.indexOf('p')+1];
		}
		console.log('code is : ' + code);
		console.log('link is : ' + 'https://imginn.com/p/' + code + '/');


		fetch('https://imginn.com/p/' + code + '/').then(res => res.text())
		.then(html => {
		    console.log(html)
		    const $ = cheerio.load(html)
		    const title = $("div[class='fullname']")[0]
		    const titleText = $(title).find('a').text();

		    console.log('1 : ' + title ? title : "no title")
		    console.log('2 : ' + titleText)

		    const instaEmbed = new Discord.MessageEmbed()
				.setColor('#000000')
				.setTitle(titleText)
				.setURL('https://discord.js.org/')
				.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
				.setDescription('Some description here')
				.setThumbnail('https://i.imgur.com/wSTFkRM.png')
				.addFields(
					{ name: 'Regular field title', value: 'Some value here' },
					{ name: '\u200B', value: '\u200B' },
					{ name: 'Inline field title', value: 'Some value here', inline: true },
					{ name: 'Inline field title', value: 'Some value here', inline: true },
				)
				.addField('Inline field title', 'Some value here', true)
				.setImage('https://i.imgur.com/wSTFkRM.png')
				.setTimestamp()
				.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

			message.channel.send(instaEmbed);
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