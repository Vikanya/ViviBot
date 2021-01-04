const fetch = require("node-fetch")
const cheerio = require("cheerio")

module.exports = {
	name: 'guess',
	description: 'Chantier',
	execute(message, args, keyv) {
		fetch('https://dbkpop.com/db/female-k-pop-idols').then(res => res.text())
		.then(html => {
		    const $ = cheerio.load(html)
		    const title = $("meta[property='og:title']")[0] || $("meta[name='twitter:title']")
		    const table = $("meta[id='table_1']")[0]

		    console.log(title ? title.attribs.content : "no title")
		    console.log(table ? table.attribs.content : "no description")
		});
	},
};