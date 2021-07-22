const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

// Controladores modulo login
const { login, recuperarPassword, newPassword, passwordPreguntas } = require('../controllers/AuthCtrl');
const { user } = require('../controllers/userCtrl');
const { preguntas, getAllPreguntas, loginPreguntas } = require('../controllers/preguntasCtrl');

// Middlewares modulo login
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { esAdminRole, tieneRol } = require('../middlewares/validar-rol');

// Rutas API modulo_login
router.post('/login', [check('correo', 'Debe ser un correo valido y es requerido').isEmail(), check('password', 'La contraseña debe contener al menos 4 dígitos y es requerido').isLength({ min: 4 }), validarCampos], login);

// Ruta recuperar contraseña
router.post('/recuperarContrasenia', [check('correo', 'Debe ser un correo valido y es requerido').isEmail(), validarCampos], recuperarPassword);

// Ruta recuperar contraseña por preguntas
router.post('/recuperarPorPreguntas', [check('correo', 'Debe ser un correo valido y es requerido').isEmail(), check('respuesta', 'La respuesta es obligatoria').not().isEmpty(), validarCampos], passwordPreguntas);

// Ruta para crear la nueva contraseña
router.put('/nuevaContrasenia', [check('password', 'La contraseña debe contener al menos 4 dígitos y es requerido').isLength({ min: 4 }), validarCampos], newPassword);

// Ruta para probar los middlewares
router.get('/usuarios/:id', [validarJWT, esAdminRole, tieneRol(1, 3)], user);

// ruta insertar preguntas
router.post('/preguntas', [check('respuesta1', 'La respuesta es obligatoria').not().isEmpty(), check('respuesta2', 'La respuesta es obligatoria').not().isEmpty(), validarCampos], preguntas);

// Ruta para crear autenticacion si el usuario hace su primer login
router.post('/preguntas_login', [check('correo', 'Debe ser un correo valido y es requerido').isEmail(), validarCampos], loginPreguntas);

// Ruta para traer las preguntas
router.get('/preguntas', getAllPreguntas);

module.exports = router;
