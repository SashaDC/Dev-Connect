/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  // Insert sample data
  await knex('users').insert([
    {
      auth_id: 'auth0|123',
      email: 'john@example.com',
      username: 'mysteryman',
      full_name: 'John Doe',
      location: 'Wellington',
      image: 'https://example.com/avatar1.png',
      bio: 'someone to trust',
    },
    {
      auth_id: 'auth0|456',
      email: 'jane@example.com',
      username: 'mysterywoman',
      full_name: 'Jane Doe',
      location: 'Auckland',
      image: 'https://example.com/avatar2.png',
      bio: 'a friendly face',
    },
  ])
}
