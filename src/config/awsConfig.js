// AWS Cognito Configuration
// Configuration values are now loaded from environment variables

const awsConfig = {
  Auth: {
    // AWS region from environment variable
    region: process.env.REACT_APP_AWS_REGION,
    
    // Cognito User Pool ID from environment variable
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    
    // Cognito User Pool Web Client ID from environment variable
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
    
    // Optional: OAuth configuration (uncomment if needed)
    // oauth: {
    //   domain: process.env.REACT_APP_OAUTH_DOMAIN,
    //   scope: ['email', 'profile', 'openid'],
    //   redirectSignIn: process.env.REACT_APP_OAUTH_REDIRECT_SIGN_IN || `http://localhost:${process.env.PORT || 3000}/`,
    //   redirectSignOut: process.env.REACT_APP_OAUTH_REDIRECT_SIGN_OUT || `http://localhost:${process.env.PORT || 3000}/`,
    //   responseType: 'code'
    // }
  }
};

export default awsConfig;
