const fs = require('fs');
const jsonfile = require('jsonfile');
const Discord = require('discord.js');
const superagent = require('superagent')

//Here the command starts
module.exports = {
    //definition
    name: "add-db", //the name of the command 
    category: "fun", //the category this will be listed at, for the help cmd
    aliases: ["say", "sayit"], //every parameter can be an alias
    cooldown: 2, //this will set it to a 2 second cooldown
    usage: "say <Text>", //this is for the help command for EACH cmd
    description: "Resends the message", //the description of the command

    //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
        const { body } = `{id: ${args[0]}, image: ${args[1]}, name: ${args[2]}}`
        var sampleObject = { body };

    fs.writeFile("./commands/test/dbcosmetiques.json", JSON.stringify(sampleObject, null, 4), (err) => {
        if (err) {  console.error(err);  return; };
        console.log("File has been created");
});
        

    }
}