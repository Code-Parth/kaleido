import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import dalleRoutes from './routes/dalleRoutes.js';

// const express = require('express');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
    res.status(200).json({
        message: 'Hello from DALL.E!',
    });
});

app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});