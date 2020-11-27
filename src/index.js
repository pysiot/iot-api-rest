const app1 = require('./app');
 
const port = process.env.PORT || 3002;

async function main(){
  await app1.listen(port);
  //res.send('WELCOME MIINCODE API :) ')
  console.log('Server port >>> ' +port);
}

main();
