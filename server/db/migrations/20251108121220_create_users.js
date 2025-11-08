/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.text('auth_id').unique().notNullable()
    table.string('email').unique().notNullable()
    table.string('username')
    table.string('full_name')
    table.string('location')
    table.string('image')
    table.text('bio')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('users')
}
