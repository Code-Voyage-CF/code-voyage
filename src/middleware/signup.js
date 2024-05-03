const auth0 = require('auth0');
const bcrypt = require('bcrypt');


async function signupMiddleware(req, res, next) {
  const { email, password } = req.body;

  try {
    const auth0Client = new auth0.ManagementClient({ // Initialize here
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      scope: 'create:users'
    });

    const saltRounds = 10; // Adjust salt rounds as needed
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await auth0Client.createUser({ // Use createUser method
      connection: 'Username-Password-Authentication',
      email,
      password: hashedPassword,
      email_verified: false
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      userId: user.user_id
    });
  } catch (err) {
    console.error('Error creating user:', err);

    let errorMessage = 'Signup failed';
    if (err.code === '400') {
      errorMessage = 'Invalid email or password format';
    } else if (err.message.includes('duplicate')) {
      errorMessage = 'Email address already in use';
    }

    res.status(400).json({ // Send only one error response
      success: false,
      error: errorMessage
    });
  }
}

module.exports = signupMiddleware;