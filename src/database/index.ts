// both cli and createConnection reading their dates from ormconfig.json by default

import { createConnection } from 'typeorm';

createConnection();
