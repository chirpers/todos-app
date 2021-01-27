const config = {
  API_URL: process.env.REACT_APP_API_URL || 'https://a.diyapis.com/mytest', //'http://localhost:3004/mytest'
  MODE: process.env.REACT_APP_API_URL || null, // use 'dev' to redirect to local app
};

export default config;
