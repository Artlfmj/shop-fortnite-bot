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
		const info = await superagent.get("https://shopbot.ml/assets/api/status.json")
        console.log(info.body)
        
	}
        
    } 
    




