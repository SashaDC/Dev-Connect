/** @param {import('knex').Knex} knex */
export async function seed(knex) {
  await knex('group_members').del()
  await knex('groups').del()

  const [g1, g2] = await knex('groups').insert(
    [
      {
        name: 'Full Stack Devs',
        description: 'All things web',
        is_private: false,
        owner_id: 1,
      },
      {
        name: 'AI & ML',
        description: 'Models and pizza',
        is_private: false,
        owner_id: 2,
      },
    ],
    ['id'],
  )

  await knex('group_members').insert([
    { group_id: g1.id ?? g1, user_id: 2, role: 'owner' },
    { group_id: g2.id ?? g2, user_id: 2, role: 'owner' },
  ])
}
