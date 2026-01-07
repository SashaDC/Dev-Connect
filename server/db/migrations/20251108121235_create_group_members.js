/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('group_members', (table) => {
    table.increments('id').primary()
    table.integer('group_id')
    table.integer('user_id')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('group_members')
}
