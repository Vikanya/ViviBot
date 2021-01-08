//const userInstagram = require("user-instagram");
//const axios = require('axios');
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


		fetch('https://imginn.com/p/CJvyagtFR_k/').then(res => res.text())
		.then(html => {
		    console.log(html)
		    const $ = cheerio.load(html)
		    const title = $("div[class='fullname']")[0]
		    const table = $("table[id='table_1']")[0]

		    console.log(title ? title.attribs.content : "no title")
		    //console.log(table ? table : "no table")
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