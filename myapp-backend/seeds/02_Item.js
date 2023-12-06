/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('Item').del()

  const userIds = await knex('User').pluck('id');

  await knex('Item').insert([
    {userId: userIds[0], item_name: 'Piano', description: 'Grand Piano', quantity: 1},
    {userId: userIds[0], item_name: 'Guitar', description: 'Electric Guitar', quantity: 1},
    {userId: userIds[0], item_name: 'Drums', description: 'Drum Set', quantity: 1},
    {userId: userIds[1], item_name: 'Bass', description: 'Bass Guitar', quantity: 1},
    {userId: userIds[1], item_name: 'Fiddle', description: 'Cody Johnson\'s Fiddle', quantity: 1},
    {userId: userIds[1], item_name: 'Unicycle', description: 'Mojo-Jojo riding on a unicycle', quantity: 10}
  ]);
};