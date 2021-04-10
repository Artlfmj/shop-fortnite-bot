const Discord = require('discord.js')
const superagent = require('superagent');
const { stripIndents } = require("common-tags");
const fs = require('fs');
const Client = require("fortnite");
const ft = new Client("c90fc89e-52fb-4fb5-a97d-9bcd26671800");


module.exports = {
    name: "shop",
    aliases: ["aliase"],
    description: "Envoie Shop",
    category: "fortnite",
    guildOnly: true,
    cooldown: 2,
    usage: "s!shop",
    run: async (client, message, args, user, text, prefix) => {
        message.delete();
        const Wait = new Discord.MessageEmbed()
        .setTitle("VEUILLEZ PATIENTER | Le shop est en cours de chargement")
        const msg = await message.channel.send(Wait); 
        message.channel.startTyping();
        let { body } = await superagent.get("https://fortool.fr/cm/api/v1/shop?lang=fr")
        const Shop = new Discord.MessageEmbed()
	    .setColor('#2f3136')
	    .setTitle('Shop Fortnite')
	    .setAuthor('Shop Bot s!shop', "https://shopbot.ml/assets/bot/logo.png" )
	    .setDescription(`Shop Fortnite du jour: `)
        .setImage(body.images.default)
        .setTimestamp()
	    .setFooter('© Copyright SHOP 2021', "https://shopbot.ml/assets/bot/logo.png" );
        const store = await ft.store();
        const embed = new Discord.MessageEmbed()
        .setTitle("CONTENU DU SHOP")
        .setColor("DARK BLUE")
        store.sort((a, b) => {
            return b.vbucks - a.vbucks;
        });
        store.forEach(el => {
            embed.addField(el.name, stripIndents`**- Rarity:** ${el.rarity}
            **- Price:** ${el.vbucks} v-bucks`, true)
        });
        msg.delete()
        message.channel.send(Shop);
        message.channel.send(embed)
        message.channel.stopTyping();
    
        },
};