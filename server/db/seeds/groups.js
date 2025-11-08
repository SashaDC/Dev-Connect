/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('groups').del()
  // Insert sample data
  await knex('groups').insert([
    { name: 'React Devs', created_by_user_id: 1 },
    { name: 'Node Enthusiasts', created_by_user_id: 2 },
  ])
}
