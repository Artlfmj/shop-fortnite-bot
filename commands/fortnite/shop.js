const Discord = require('discord.js')
const superagent = require('superagent');
const fs = require('fs');

module.exports = {
    name: "shop",
    aliases: ["aliase"],
    description: "Envoie Shop",
    category: "fortnite",
    guildOnly: true,
    cooldown: 2,
    usage: "s!shop",
    run: async (client, message, args, user, text, prefix) => {
        message.channel.startTyping();
        let { body } = await superagent.get("https://fortool.fr/cm/api/v1/shop?lang=fr")
        const Shop = new Discord.MessageEmbed()
	    .setColor('#0099ff')
	    .setTitle('Shop Fortnite')
	    .setAuthor('Shop Bot par Artlfmj#0310')
	    .setDescription(`Shop Fortnite du jour: `)
        .setImage(body.images.default)
        .setTimestamp()
	    .setFooter('Copyright Intermarket 2021');

        message.channel.send(Shop);
        message.channel.stopTyping();
        var sampleObject = { body };
    

        fs.writeFile("./commands/fortnite/db/shop/shop.json", JSON.stringify(sampleObject, null, 4), (err) => {
            if (err) {  console.error(err);  return; };
            console.log("File has been created");
        });
        },
};