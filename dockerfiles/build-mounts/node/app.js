'use strict';

const express = require('express');
const winston = require('winston');
const dayjs = require('dayjs');
const Joi = require('joi');
const _ = require('lodash');

const PORT = 3000;
const HOST = '0.0.0.0';

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

// Prosta walidacja parametru zapytania, żeby zależności nie były martwym balastem
const querySchema = Joi.object({
  name: Joi.string().max(30).default('Kursancie'),
});

const app = express();

app.get('/', (req, res) => {
  const { value, error } = querySchema.validate(req.query);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({
    message: `Kurs Dockera, ${_.capitalize(value.name)}!`,
    timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  });
});

app.listen(PORT, HOST);
logger.info(`Running on http://${HOST}:${PORT}`);
