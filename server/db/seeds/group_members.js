/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('group_members').del()
  // Insert sample data
  await knex('group_members').insert([
    { group_id: 1, user_id: 1 },
    { group_id: 1, user_id: 2 },
    { group_id: 2, user_id: 2 },
  ])
}
