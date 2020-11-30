const app1 = require('./app');

const port = process.env.HTTP_PORT || 3002;

// const fs = require('fs')
// const https = require('https')

async function main(){
  await app1.listen(port);
  //res.send('WELCOME MIINCODE API :) ')
  console.log('Server port >>> ' +port);
}

// const httpsServerOptions = {
//   key: fs.readFileSync('./https/dev.cert'),
//   key: fs.readFileSync(process.env.KEY_PATH),
//   cert: fs.readFileSync(process.env.CERT_PATH),
// };

main();
