//here the event starts
module.exports = client => {
    console.log(`Discord Bot ${client.user.tag} is online!`); //log when ready aka the bot usable
    client.user.setActivity(`${client.user.username}`, { type: "PLAYING"}) //first parameter, is the status, second is an object with type which can be: "PLAYING", "WATCHING", "LISTENING", "STREAMING" (where you need to add a , and then url: "https://twitch.tv/#")
    client.user.setUsername("SHOP BETA")
    client.user.setAvatar('https://cdn.discordapp.com/avatars/769571046759989268/78907162ef58ca9e58f3bff9e0188c4a.webp?size=512');
}