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
        let { body } = await superagent.get("https://fortool.fr/cm/api/v1/shop?lang=fr")
        const Shop = new Discord.MessageEmbed()
	    .setColor('#0099ff')
	    .setTitle('Shop Fortnite')
	    .setAuthor('Shop Bot par Artlfmj#0310', '../images/logo.png', 'https://www.youtube.com/channel/UCLee-XQyphWxB7mQ_beGIyg')
	    .setDescription(`Shop Fortnite du jour: `)
        .setImage(body.images.default)
        .setTimestamp()
	    .setFooter('Copyright Intermarket 2021', '../images/logo.png');

        message.channel.send(Shop);
    },
};