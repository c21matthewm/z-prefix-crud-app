/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Item').del()
  await knex('Item').insert([
    {userId: 1, item_name: 'Piano', description: 'Grand Piano', quantity: 1},
    {userId: 2, item_name: 'Guitar', description: 'Electric Guitar', quantity: 1},
    {userId: 3, item_name: 'Drums', description: 'Drum Set', quantity: 1},
    {userId: 2, item_name: 'Bass', description: 'Bass Guitar', quantity: 1},
    {userId: 1, item_name: 'Fiddle', description: 'Cody Johnson\'s Fiddle', quantity: 1},
    {userId: 23, item_name: 'Unicycle', description: 'Mojo-Jojo riding on a unicycle', quantity: 10}
  ]);
};
