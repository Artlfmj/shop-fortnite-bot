const Discord = require('discord.js')
const superagent = require('superagent');

module.exports = {
    name: "shop",
    aliases: ["aliase"],
    description: "Envoie Shop",
    category: "fortnite",
    guildOnly: true,
    cooldown: 2,
    usage: "s!shop",
    run: async (client, message, args, user, text, prefix) => {
        let { body } = await superagent.get("https://fortool.fr/cm/api/v1/shop")
        const Shop = new Discord.MessageEmbed()
	    .setColor('#0099ff')
	    .setTitle('Shop Fortnite')
	    .setAuthor('Shop Bot par Artlfmj#0310', 'https://imgur.com/a/NyPT4RO', 'https://www.youtube.com/channel/UCLee-XQyphWxB7mQ_beGIyg')
	    .setDescription(`Shop Fortnite du jour: https://api.nitestats.com/v1/shop/image`)
        .setImage(' https://api.nitestats.com/v1/shop/image')
        .setTimestamp()
	    .setFooter('Copyright Intermarket 2021', 'https://cdn.discordapp.com/attachments/745266722692530259/768033163880300574/logo.png');

        message.channel.send(Shop);
    },
};