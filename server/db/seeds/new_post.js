export async function seed(knex) {
  await knex('posts').del()
  await knex('posts').insert([
    {
      user_id: 1,
      title: 'My First Code Refactor Success',
      content: 'Just finished refactoring...',
      mediaType: 'something',
      mediaURL: 'http://whatever',
      created_at: knex.fn.now(),
    },

    // {
    //   // userId: 2,
    //   title: "Knex/TS Type Mismatch Error", // New 'title' column
    //   content: "Anyone else running into issues with the new Knex update and TypeScript? Getting a strange type mismatch error when calling `.where()`. Help a dev out! 🙏",
    //   mediaType: null,
    //   mediaURL: null,
    //   created_at: knex.fn.now(), // Use 'created_at' column name
    // },
    // {
    //   // userId: 3,
    //   title: "Successful Deployment After 4 Days!", // New 'title' column
    //   content: "Finally deployed my full-stack app to the cloud! 🎉 It only took 4 days of debugging network issues. #DevOps #Deployment",
    //   mediaType: null,
    //   mediaURL: null,
    //   created_at: knex.fn.now(), // Use 'created_at' column name
    // },
  ])
}
