/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  await knex.schema.createTable('group_members', (t) => {
    t.increments('id').primary()
    t.integer('group_id').notNullable().index()
    t.integer('user_id').notNullable().index()
    t.string('role', 20).notNullable().defaultTo('member') // 'owner'|'admin'|'member'
    t.timestamp('joined_at', { useTz: true }).defaultTo(knex.fn.now())
    t.unique(['group_id', 'user_id'])
  })
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('group_members')
}
