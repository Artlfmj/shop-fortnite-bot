const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./index.js', {
    // for ShardingManager options see:
    // https://discord.js.org/#/docs/main/v12/class/ShardingManager
    totalShards: '10',
    token: 'Nzk3NDE4NDQ4NTE3OTg4MzYy.X_mLzQ.Vj1MW8bRvvRzojNcuQj5KoLcjb8'
  });
  manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));
  manager.spawn();