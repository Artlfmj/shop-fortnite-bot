///https://fortniteapi.io/v1/seasons/list?lang=en

//Here the command starts
const Discord = require('discord.js')

const FortniteAPI = require("fortnite-api-io");
const fs = require('fs');
const fortniteAPI = new FortniteAPI("5322113d-12065afe-cd591053-39cf2335")

module.exports = {
    //definition
    name: "test", //the name of the command 
    category: "fortnite", //the category this will be listed at, for the help cmd
    aliases: [""], //every parameter can be an alias
    cooldown: 2, //this will set it to a 2 second cooldown
    usage: "", //this is for the help command for EACH cmd
    description: "", //the description of the command

    //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
       
       const bundles = await fortniteAPI.listPreviousMaps()
       console.log(bundles)

    }
}