import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

export const app = express();

app.use(helmet());

// Enable cors
app.use(cors());
// Enable pre-flight
app.options('*', cors);
