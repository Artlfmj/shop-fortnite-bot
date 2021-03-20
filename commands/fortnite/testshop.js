///https://api.fortnitetracker.com/v1/store

const Discord = require('discord.js')
const superagent = require('superagent');
const Client = require('fortnite');
const fortnite = new Client('c90fc89e-52fb-4fb5-a97d-9bcd26671800');
const FortniteAPI = require("fortnite-api-io");
const fortniteAPI = new FortniteAPI("5322113d-12065afe-cd591053-39cf2335")
const Canvas = require("discord-canvas");

module.exports = {
    name: "testshop",
    aliases: ["aliase"],
    description: "Envoie Shop",
    category: "fortnite",
    guildOnly: true,
    cooldown: 2,
    usage: "s!shop",
    run: async (client, message, args, user, text, prefix) => {
        const m = await message.channel.send("PLEASE_WAIT")

		
		const shop = new Canvas.FortniteShop();
		const image = await shop
			.setToken("641457d7-5f49-47cb-8fe1-b5f5abddc469")
			.setText("header")
			.setText("daily")
			.setText("featured")
			.setText("date")
			.setText("footer")
			.toAttachment();
		const attachment = new Discord.MessageAttachment(image, "shop.png");

		const embed = new Discord.MessageEmbed()
			
			.attachFiles(attachment)
			.setImage("attachment://shop.png")
			.setColor("RANDOM")
			.setFooter("TEST");
		await message.channel.send(embed);
		await m.delete();
		return;
        
	}
        
    } 
    




