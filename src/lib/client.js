import { createClient } from 'diyapis';
import config from '../config';

console.log({createClient});

const client = createClient({apiUrl: config.API_URL});
global.client = client;

export default client;

