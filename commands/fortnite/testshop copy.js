///https://api.fortnitetracker.com/v1/store

const Discord = require('discord.js')
const superagent = require('superagent');

const Canvas = require("discord-canvas");
var Buffer = require('buffer');
const fs = require('fs');

module.exports = {
    name: "testshop",
    aliases: ["aliase"],
    description: "Envoie Shop",
    category: "fortnite",
    guildOnly: true,
    cooldown: 2,
    usage: "s!shop",
    run: async (client, message, args, user, text, prefix) => {
		let { image } = await superagent.get('https://api.nitestats.com/v1/shop/image/footer=CODE-LFMRD')
        message.channel.send(image)
        
	}
        
    } 
    




