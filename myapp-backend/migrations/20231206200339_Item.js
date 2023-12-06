/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Item', table => {
      table.increments('id').primary();
      table.integer('userId').unsigned().notNullable();
        table.foreign('userId').references('id').inTable('User');
      table.string('item_name').notNullable();
      table.string('description').notNullable();
      table.integer('quantity').notNullable();
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Item');
  };