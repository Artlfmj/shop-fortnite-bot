//here the event starts
const Discord = require('discord.js')
const canvas = require('canvas')
const Canvas = require('discord-canvas')
module.exports = async (client, member) => {
    //logs when a member joins, make sure to have GuildMemberIntents active in discord.com/developers
    console.log(member + "joined in: " + member.guild.name)
    if(member.guild.id === "822747635517227009"){
        let avatar = member.displayAvatarURL({
            dynamic: true,
            size: 512,
            format: "png",
        })
        const image = new Canvas.Welcome()
        .setUsername(member.username)
        .setDiscriminator(member.tag)
        .setMemberCount(member.guild.memberCount)
        .setGuildName(member.guild.name)
        .setAvatar(avatar)
        .setColor("border", "#8015EA")
        .setColor("username-box", "#8015EA")
        .setColor("discriminator-box", "#8015EA")
        .setColor("message-box", "#8015EA")
        .setColor("title", "#8015EA")
        .setColor("avatar", "#8015EA")
        .setBackground("https://site.com/background.jpg")
        .toAttachment();
    
        const attachment = new Discord.MessageAttachment(image.toBuffer(), "welcome-image.png");
        message.channel.send(attachment);
    }
};

