/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id').primary()
    table.string('title', 255).notNullable()
    table.text('content').notNullable()
    table.string('mediaType', 20)
    table.string('mediaURL', 255)
    table.timestamps(true,true)

    // table.string('timestamp').defaultTo(knex.fn.now() isn't modern convention anymore, but it is Knex option. 


  })
}

export async function down(knex) {
  return knex.schema.dropTable('posts')
}
