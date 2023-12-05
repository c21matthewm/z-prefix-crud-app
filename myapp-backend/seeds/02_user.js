/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('User').del()
  await knex('User').insert([
    {first_name: 'Jogee', last_name: 'Burke', username: 'jogeeburke', password: 'password'},
    {first_name: 'Cody', last_name: 'Johnson', username: 'codyjohnson', password: 'password'},
    {first_name: 'Mojo', last_name: 'Jojo', username: 'mojojojo', password: 'password'},
  ]);
};
