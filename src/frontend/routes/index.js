const express = require('express');
const router = express.Router();

// controllers vistas
const authCtrl = require('../controllers/auth/AuthCtrl');

// rutas de las pantallas modulo_login
router.get('/', authCtrl.pantalla_inicio);
router.get('/auth/login', authCtrl.pageAuth);
router.get('/auth/recuperacion', authCtrl.recuperacion);
router.get('/auth/new_password', authCtrl.newPassword);
router.get('/auth/correo', authCtrl.correo);
router.get('/auth/preguntas', authCtrl.preguntas);
router.get('/auth/respuestas', authCtrl.respuestas);
router.get('/home', authCtrl.home);

// router.get('*', (req, res) => res.redirect('/'));
module.exports = router;
