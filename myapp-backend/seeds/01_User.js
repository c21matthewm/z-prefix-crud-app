/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('User').del()
  await knex('User').insert([
    {first_name: 'Bill', last_name: 'Gates', username: 'billgates', password: 'password'},
    {first_name: 'Steve', last_name: 'Jobs', username: 'stevejobs', password: 'password'}
  ]);
};