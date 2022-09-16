Workflow:
1. sequelize init (creates 4 new folders):
config - (connects sequelize with database)
models - (create tables for database, file represents table, ex. Posts.js)
----------------------------------------------------------

bcrypt - allows us to hash strings(passwords).
User has a password, like: Dog123.
And I don't want to store that into a Table, because if
somebody has access to that Table, we don't want them to see it.

hashing - is a one way function, we put the password into the algorithm,
which hashes to random Strings and Letters. And there is no way back.

All we can do is: we can hash a password again and compare it to
the hashed value to see if they were the same passwords.
----------------------------------------------------------
