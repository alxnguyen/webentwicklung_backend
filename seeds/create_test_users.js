exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, email: 'user1@email.com', password: "password1"},
        {id: 2, email: 'user2@email.com', password: "password2"},
        {id: 3, email: 'user3@email.com', password: "password3"}
      ]);
    });
};