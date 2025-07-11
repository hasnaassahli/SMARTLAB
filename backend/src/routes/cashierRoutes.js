// routes/cashierRoutes.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Cashier = require('../models/Cashier');
const auth = require('../middleware/auth');