///https://api.fortnitetracker.com/v1/store

const Discord = require('discord.js')
const superagent = require('superagent');

const Canvas = require("discord-canvas");
var Buffer = require('buffer');
const fs = require('fs');

module.exports = {
    name: "get",
    aliases: ["aliase"],
    description: "Envoie Shop",
    category: "fortnite",
    guildOnly: true,
    cooldown: 2,
    usage: "s!shop",
    run: async (client, message, args, user, text, prefix) => {
		const info = await superagent.get(args[0])
        var sampleObject = { info };
        
    

        fs.writeFile("./commands/fortnite/db/test/testshop.json", JSON.stringify(sampleObject, null, 4), (err) => {
            if (err) {  console.error(err);  return; };
            console.log("File has been created");
        });
        const attach = new Discord.MessageAttachment()
        .setFile("./commands/fortnite/db/test/testshop.json")
        message.channel.send(attach)
        fs.writeFile("./commands/fortnite/db/test/html.json", JSON.stringify(info.text, null, 4), (err) => {
            if (err) {  console.error(err);  return; };
            console.log("File has been created");
        });
        const attach2 = new Discord.MessageAttachment()
        .setFile("./commands/fortnite/db/test/html.json")
        message.channel.send(attach2)
        
	}
        
    } 
    




