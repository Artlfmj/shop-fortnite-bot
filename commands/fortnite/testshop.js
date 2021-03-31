///https://api.fortnitetracker.com/v1/store

const Discord = require('discord.js')
const superagent = require('superagent');

const Canvas = require("discord-canvas");
var Buffer = require('buffer');

module.exports = {
    name: "testshop",
    aliases: ["aliase"],
    description: "Envoie Shop",
    category: "fortnite",
    guildOnly: true,
    cooldown: 2,
    usage: "s!shop",
    run: async (client, message, args, user, text, prefix) => {
		let member = message.author
		

        let avatar = member.displayAvatarURL({
            dynamic: true,
            size: 512,
            format: "png",
        })
        const image = await new Canvas.Welcome()
        .setUsername(member.username)
        .setDiscriminator(member.tag)
        .setMemberCount("8")
        .setGuildName("TECHN'CODE")
        .setAvatar(avatar)
        .setColor("border", "#8015EA")
        .setColor("username-box", "#8015EA")
        .setColor("discriminator-box", "#8015EA")
        .setColor("message-box", "#8015EA")
        .setColor("title", "#8015EA")
        .setColor("avatar", "#8015EA")
        .setBackground("https://img.freepik.com/photos-gratuite/fond-aquarelle-peint-main-forme-ciel-nuages_24972-1095.jpg?size=626&ext=jpg")
        .toAttachment();
    
        const attachment = new Discord.MessageAttachment(await image.toAttachment(), "welcome-image.png");
        message.channel.send(attachment);
        
	}
        
    } 
    




