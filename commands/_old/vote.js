module.exports = {
	name: 'vote',
	description: 'Collection of commands to organise votes:\n__add__: edits the vote message to add (a) new option(s).\n__remove__: edits the vote message to remove the specified option(s).\n__start__: copies the last vote message, unpins it, sends a new one and pins it.\n',
	args: true,
	usage: 'add "**<emoji>** | **<option name>**" ["**<emoji>** | **<option name>**"...]\nOR\nremove "**<emoji>**" ["**<emoji>**" "**<emoji>**"...]\nOR\nstart',
	
	header: '[VOTE]',
	execute(message, args, redis, tryfetch = true) {
		console.log("vote command started by " + message.author.username);
		if (!redis.get('qergserrgsegs').then(messageID => 
		{
			if (messageID)
			{
				console.log('id from redis : ' + messageID);
				message.channel.messages.fetch(messageID).then(voteMessage => {
					if (args.length < 1)
					{
						message.reply('You need at least 1 argument for this command. (type \'!help vote\' for more info)');
					}
					else 
					{
						//console.log('command is ' + args[0]);
						let currentVotes = voteMessage.content.replace(this.header, '').split('\n');

					    let remainingArgs = '';

						switch (args.shift().toLowerCase()){

						  case 'add':
						    
						    remainingArgs = '';
							args.forEach(element => remainingArgs += element);
							remainingArgs = remainingArgs.trim().split('"');
							
							let voteStr1 = '';
							remainingArgs.forEach(async str => {
								//console.log(str);
								if (str.trim().length > 0)
								{
									let emoji = str.split('|')[0];
									let name = str.split('|')[1];
									console.log("add new vote emoji: " + emoji + " /name: " + name);

									if (currentVotes.every(vote => !vote.includes(emoji)))
									{
										voteStr1 += '\n' + emoji + ' ' + name;
									}/*
									else 
									{
										message.react(emoji);
									}*/

									await voteMessage.react(emoji).catch(err => 
									{
										message.channel.messages.fetch({ limit: 1, after: voteMessage.id }).then(async nextRes => 
										{
											nextMes = nextRes.first();
											if (nextMes == undefined)
											{
												message.channel.send('trop de votes la <:viviDisapproval:696755029830533230>')
												.then(createdMes =>
													{
														createdMes.react(emoji);
													});
											}
											else
											{
												nextMes.react(emoji).catch(err => 
												{
													message.channel.messages.fetch({ limit: 1, after: voteMessage.id }).then(async nextRes2 => 
													{
														nextMes2 = nextRes2.first();
														if (nextMes2 == undefined)
														{
															message.channel.send('trop de votes la <:viviDisapproval:696755029830533230>')
															.then(createdMes =>
																{
																	createdMes.react(emoji);
																});
														}
														else
														{
															nextMes2.react(emoji);
														}
													});
												});;
											}
										});
									});
									//console.log("reacted ");
								}
							});
							voteMessage.edit(voteMessage.content + voteStr1);
							break;

						  case 'remove':

						    remainingArgs = '';
							args.forEach(element => remainingArgs += element);
							remainingArgs = remainingArgs.trim().split('"');
							
							remainingArgs.forEach(async str => {
								//console.log(str);
								if (str.trim().length > 0)
								{
									console.log("remove vote emoji: " + str);
									//console.log("removing a vote: " + str + " num : " + currentVotes.length);
									currentVotes = currentVotes.filter(vote => !vote.includes(str));
									//console.log("after num : " + currentVotes.length);
									/*
									else 
									{
										message.react(emoji);
									}*/

									await voteMessage.reactions.cache.get(str).remove().catch(err => 
									{
										message.channel.messages.fetch({ limit: 1, after: voteMessage.id }).then(async nextVoteRes => 
										{
											nextVoteMes = nextVoteRes.first();
											if (nextVoteMes != undefined)
											{
												nextVoteMes.reactions.cache.get(str).remove();
											}
										});
									});
								}
							});
							let resultString = this.header;
							currentVotes.forEach(str => {
								if (str.trim().length > 0)
								{
									resultString += '\n' + str;
								}
							});
							voteMessage.edit(resultString);
						    break;

						  case 'start':

							console.log("starting new vote");
							voteMessage.unpin();
							message.channel.send(voteMessage.content).then(mes => {
								mes.pin();
								redis.set('qergserrgsegs', mes.id);

								currentVotes.forEach(str => {
									if (str.trim().length > 0)
									{
										mes.react(str.split(' ')[0]).catch(err => 
										{
											message.channel.messages.fetch({ limit: 1, after: mes.id }).then(async nextRes => 
											{
												nextMes = nextRes.first();
												if (nextMes == undefined)
												{
													message.channel.send('trop de votes la <:viviDisapproval:696755029830533230>')
													.then(createdMes =>
														{
										  					createdMes.react(str.split(' ')[0]);
														});
												}
												else
												{
										  			nextMes.react(str.split(' ')[0]).catch(err => 
													{
														message.channel.messages.fetch({ limit: 1, after: mes.id }).then(async nextRes2 => 
														{
															nextMes2 = nextRes2.first();
															if (nextMes2 == undefined)
															{
																message.channel.send('trop de votes la <:viviDisapproval:696755029830533230>')
																.then(createdMes2 =>
																	{
													  					createdMes2.react(str.split(' ')[0]);
																	});
															}
															else
															{
													  			nextMes2.react(str.split(' ')[0]);
															}
														});
													});
												}
											});
										});
									}
								});
							});


						    
						    break;
						  default:
							message.reply('Your vote command isn\'t using proper arguments. (type \'!help vote\' for more info)');
						}
					}
				}).catch(err => {
					console.log('fetch 1 ' + err);
					if (tryfetch)
					{
						this.fetch(message, args, redis);
					}
				});
				return;
			}
			else 
			{
				console.log('fetch 2');
				if (tryfetch)
				{
					this.fetch(message, args, redis);
				}
				return;
			}
		}))
		{
			console.log('fetch 3');
			if (tryfetch)
			{
				this.fetch(message, args, redis);
			}
			return;
		}
		
	},
	async fetch(message, args, redis) {
		//console.log('fetching for vote message');
		message.channel.messages.fetchPinned().then( messages =>
		{
			//console.log('Received ' + messages.size + ' messages');
			let botMessages = messages.filter(m => m.author.bot && m.content.startsWith(this.header));
			//console.log(botMessages.size + ' bot messages ' + botMessages);
			if (botMessages.size == 0)
			{
				message.channel.send(this.header).then(voteMessage => 
				{
					voteMessage.pin();
					//console.log('1/id ' + voteMessage.id);
					redis.set('qergserrgsegs', voteMessage.id).then(this.execute(message, args, redis, false));
				});
			}
			else 
			{
				//console.log('2/id ' + botMessages.first().id);
				redis.set('qergserrgsegs', botMessages.first().id).then(this.execute(message, args, redis, false));
			}
		})
	},

};