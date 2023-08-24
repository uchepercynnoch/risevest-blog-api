import http from 'http';

import 'dotenv/config';

import start from './modules/core/start';
import app from './app';

const server = http.createServer(app);

void start(server);
