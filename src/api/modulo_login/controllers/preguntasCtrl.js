const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generarJWT } = require('../helpers/generar-jwt');

const { getUsuario, postRespuestas, tokenPreguntas, getPreguntas, putUsuario, getEmail } = require('../model/users');

const preguntas = async (req, res) => {
   // Validación para revisar que venga el token
   if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No tiene Autorización' });
   }

   const pregunta1 = req.body.pregunta1;
   const respuesta1 = req.body.respuesta1;
   const pregunta2 = req.body.pregunta2;
   const respuesta2 = req.body.respuesta2;

   // Encriptar la respuestas secretas
   const salt = bcryptjs.genSaltSync();
   const newRespuesta1 = bcryptjs.hashSync(respuesta1, salt);
   const newRespuesta2 = bcryptjs.hashSync(respuesta2, salt);

   const token = req.headers.authorization.split(' ')[1];

   try {
      // Verificar el token del url y extraer el uid
      const { uid, estado } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

      if (!uid) {
         return res.status(400).json({ message: 'El usuario no existe' });
      }

      // Verificar si uid del token existe en la BD
      const usuario = await getUsuario(uid);

      if (!usuario) {
         return res.status(400).json({ message: 'El usuario no existe' });
      }

      // Verificamos si existe el token en la BD
      if (!usuario.token_preguntas) {
         return res.status(401).json({
            message: 'No tienes autorización para estar aquí!!',
         });
      }
      // verificar que el token de la ruta sea igual al de la base de datos
      if (token !== usuario.token_preguntas) {
         return res.status(401).json({
            message: 'No tienes autorización para estar aquí!!',
         });
      }

      // Verificar si el uid tiene estado act
      if (estado !== 'activo') {
         return res.status(401).json({
            message: 'El usuario no existe',
         });
      }

      const nombre = usuario.nombre_usuario;
      const fechas = new Date();

      // Guardar las respuestas del usuario
      const respuestas = [
         [uid, pregunta1, newRespuesta1, nombre, fechas],
         [uid, pregunta2, newRespuesta2, nombre, fechas],
      ];

      await postRespuestas(respuestas);

      // // Limpiamos el token_preguntas de la BD
      const tokenPregunta = null;
      const sesion = 1;
      const fecha = new Date();

      await tokenPreguntas(tokenPregunta, sesion, fecha, uid);

      res.status(201).json({ message: 'Preguntas guardadas exitosamente' });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Hable con el administrador' });
   }
   //    Fin try-catch
};

const loginPreguntas = async (req, res) => {
   const email = req.body.email;

   try {
      // Modelo de datos de usuario
      const usuario = await getEmail(email);

      // Verificar si el correo existe
      if (usuario === undefined) {
         return res.status(400).json({ message: 'El usuario o la contraseña son incorrectos' });
      }

      // Si el usuario esta activo
      if (usuario.indicador_usuario !== 'activo') {
         return res.status(400).json({ message: `El usuario con este email: ${correo} no existe!!` });
      }

      if (usuario.primera_sesion !== 0) {
         return res.status(400).json({ message: `No permitido, no es su primera sesión` });
      }

      // Generar el token
      let token = await generarJWT(usuario.id_usuario, usuario.id_rol_usuario, usuario.indicador_usuario, usuario.nombre_usuario);

      //   datos para hacer el update en usuario
      const id = usuario.id_usuario;
      const tokenPreguntas = token;
      const fecha = new Date();

      //   Actualizamos información del usuario
      await putUsuario(tokenPreguntas, fecha, id);

      res.status(200).json({
         message: 'Responder las preguntas secretas para iniciar sesión',
         token: token,
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Hable con el administrador' });
   }
   //    Fin try-catch
};

const getAllPreguntas = async (req, res) => {
   try {
      // Modelo de datos para obtener el preguntas
      const preguntas = await getPreguntas();

      if (!preguntas) {
         return res.status(400).json({ message: 'No hay resultados' });
      }

      res.status(200).json(preguntas);
   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Hable con el administrador' });
   }
};

module.exports = {
   preguntas,
   loginPreguntas,
   getAllPreguntas,
};
