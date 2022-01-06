const bcrypt = require("bcrypt");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      const saltRounds = 10;

      var password1 = bcrypt.hash("password1", saltRounds, function(err, hash) {
        const password1 = hash;
        console.log(password1);
      });
      var password2 = bcrypt.hash("password2", saltRounds, function(err, hash) {
          const password2 = hash;
          console.log(password1);
      });
      var password3 = bcrypt.hash("password3", saltRounds, function(err, hash) {
        const password1 = hash;
        console.log(password1);
      });
      console.log(password1, password2, password3);
      return knex('users').insert([
        {id: 1, email: 'user1@email.com', password: password1},
        {id: 2, email: 'user2@email.com', password: password2},
        {id: 3, email: 'user3@email.com', password: password3}
      ]);
    });
};