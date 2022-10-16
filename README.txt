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

jsonwebtoken - Information Exchange as a JSON object: good way of securely 
transmitting information between parties because they can be signed, which means you 
can be sure that the senders are who they say they are. Additionally, the 
structure of a JWT allows you to verify that the content hasn't been tampered with.

JWTs are signed with a key when they are generated and then validated with a key 
upon receipt so we can verify that they haven't been modified in transit.

JWT Structure: [Header Segment][Payload Segment][Crypto Segment].

{sign} - Creates a token. Use it on the /login, to the right person.

{verify} - The receiver of the JWT will verify the signature to ensure 
that the token hasn't been altered after it was signed by the issuer.

----------------------------------------------------------
Our ACCESS_TOKEN should always be in the cookies!!! httpOnly
Because user can access: LocalStorage || SessionStorage
cookie-parser