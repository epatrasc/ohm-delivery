require('dotenv').config();

const app = require('./app');

const port = process.env.PORT || 3000;

const serve = () => {
  app.listen(port, () => console.log(`ohm-delivery server is listening at http://localhost:${port}`));
};

serve();
