/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  await knex.schema.createTable('groups', (t) => {
    t.increments('id').primary()
    t.string('name', 255).notNullable().unique()
    t.text('description')
    t.boolean('is_private').notNullable().defaultTo(false)
    t.integer('owner_id').notNullable() // TODO: FK to users.id when ready
    t.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now())
    t.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('groups')
}
