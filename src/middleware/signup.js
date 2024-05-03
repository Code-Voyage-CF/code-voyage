const auth0 = require('auth0');

async function signupMiddleware(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      error: 'Username and password are required'
    });
  }

  try {
    const auth0Client = new auth0.ManagementClient({
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      scope: 'create:users'
    });

    const user = await auth0Client.createUser({
      connection: 'Username-Password-Authentication',
      username,
      password,
      email_verified: false
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      userId: user.user_id
    });
  } catch (err) {
    console.error('Auth0 error:', err);

    let errorMessage = 'Signup failed';
    if (err.statusCode === 400) {
      errorMessage = 'Invalid email or password format';
    } else if (err.message.includes('duplicate')) {
      errorMessage = 'Email address already in use';
    }

    res.status(400).json({
      success: false,
      error: errorMessage
    });
  }
}

module.exports = signupMiddleware;
