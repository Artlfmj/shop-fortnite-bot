///https://api.fortnitetracker.com/v1/store

const Discord = require('discord.js')
const superagent = require('superagent');
var http = require('http');
const { stripIndents } = require("common-tags");
const fetch = require('node-fetch');
const fs = require('fs')
const winston = require('winston')

const Client = require("fortnite");
const ft = new Client(process.env.fntracker);

module.exports = {
    name: "testshop",
    aliases: ["aliase"],
    description: "Envoie Shop",
    category: "fortnite",
    guildOnly: true,
    cooldown: 2,
    usage: "s!shop",
    run: async (client, message, args, user, text, prefix) => {

        
        
        let { body } = await superagent.get("https://fortnite-api.com/v2/shop/br")
        const jsonString = JSON.stringify(body)
        
        fs.writeFile('./shop.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } 
        else{
            console.log('Successfully wrote file')
        }
        
        })  
    } 
    
}



