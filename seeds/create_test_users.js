const bcrypt = require("bcrypt");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(async function () {
      // Inserts seed entries
      const saltRounds = 10;

      const password1 = await bcrypt.hash("password1", saltRounds);
      const password2 = await bcrypt.hash("password2", saltRounds);
      const password3 = await bcrypt.hash("password3", saltRounds);

      return knex('users').insert([
        {email: 'user1@email.com', password: password1, active: true},
        {email: 'user2@email.com', password: password2, active: true},
        {email: 'user3@email.com', password: password3, active: true}
      ]);
    });
};