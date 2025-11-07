/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()

    // Inserts seed entries
  await knex('posts').insert([
    {
      id: 1, 
      title: 'this is your first post',
      content: 'baked beans is definitely better than canned spaghetti',
      mediaType: '',
      mediaURL: '',
      timestamps: '',
    },
    {
      id: 2, 
      title: 'this is your second post',
      content: 'canned spaghetti is better than canned celery',
      mediaType: '',
      mediaURL: '',
      timestamps: '',
    },
    {
      id: 3, 
      title: 'this is your thrid post',
      content: 'is there such thing as canned celery?',
      mediaType: '',
      mediaURL: '',
      timestamps: '',
    },
  ]);
};


    // table.increments('id').primary()
    // table.string('title', 255).notNullable()
    // table.text('content').notNullable()
    // table.string('mediaType', 20)
    // table.string('mediaURL', 255)
    // table.timestamps(true,true)