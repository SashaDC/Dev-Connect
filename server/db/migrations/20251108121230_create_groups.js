/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('groups', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.integer('created_by_user_id')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('groups')
}
