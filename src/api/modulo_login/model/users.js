const mysqlConnection = require('../../../config/db');

// Obtener usuario por correo
const getEmail = (pEmail) => {
   return new Promise((resolve, reject) => {
      mysqlConnection.query(`SELECT * FROM tbl_usuario WHERE correo_usuario = ?`, [pEmail], (err, row) => {
         if (err) {
            reject(err);
            console.log(err);
         } else {
            resolve(row[0]);
         }
      });
   });
};

// Obtener usuario por id
const getUsuario = (id) => {
   return new Promise((resolve, reject) => {
      mysqlConnection.query(`SELECT * FROM tbl_usuario WHERE id_usuario = ?`, [id], (err, user) => {
         if (err) {
            reject(err);
            console.log(err);
         } else {
            resolve(user[0]);
         }
      });
   });
};

// Editar usuario por id
const putUsuario = (tokenPreguntas, fecha, id) => {
   return new Promise((resolve, reject) => {
      mysqlConnection.query('UPDATE  tbl_usuario SET token_respuestas = ?, fecha_registro = ? WHERE id_usuario = ?', [tokenPreguntas, fecha, id], (err, user) => {
         if (err) {
            reject(err);
            console.log(err);
         } else {
            resolve(user[0]);
         }
      });
   });
};

// Insertar token_password a usuarios por email
const postToken = (token, id) => {
   return new Promise((resolve, reject) => {
      mysqlConnection.query('UPDATE tbl_usuario SET token_password = ? WHERE id_usuario = ?', [token, id], (err, row) => {
         if (err) {
            reject(err);
            console.log(err);
         } else {
            resolve(row[0]);
         }
      });
   });
};

// Cambiar contraseña y limpiar el campo del token
const postPassword = (id, password) => {
   return new Promise((resolve, reject) => {
      mysqlConnection.query('UPDATE tbl_usuario SET password_usuario = ? WHERE id_usuario = ?', [id, password], (err, result) => {
         if (err) {
            reject(err);
            console.log(err);
         } else {
            resolve(result[0]);
         }
      });
   });
};

// Limpiar el campo token_password después de cambiar la contraseña
const limpiarToken = (id, token_password) => {
   return new Promise((resolve, reject) => {
      mysqlConnection.query('UPDATE tbl_usuario SET token_password = ? WHERE id_usuario = ?', [id, token_password], (err, rows) => {
         if (err) {
            reject(err);
            console.log(err);
         } else {
            resolve(rows[0]);
         }
      });
   });
};

// Insertar respuestas por usuario
const postRespuestas = (respuestas) => {
   return new Promise((resolve, reject) => {
      mysqlConnection.query('INSERT INTO tbl_respuestas_usuario(id_usuario, id_preguntas, respuesta, usr_registro, fecha_registro) VALUES ?', [respuestas], (err, resp) => {
         if (err) {
            reject(err);
            console.log(err);
         } else {
            resolve(resp);
         }
      });
   });
};

// Limpiamos el token de las preguntas
const tokenPreguntas = (token_respuestas, indicador, sesion, fecha, id) => {
   return new Promise((resolve, reject) => {
      mysqlConnection.query('UPDATE tbl_usuario SET token_respuestas = ?, indicador_usuario = ?, primera_sesion = ?, fecha_registro = ? WHERE id_usuario = ?', [token_respuestas, indicador, sesion, fecha, id], (err, rows) => {
         if (err) {
            reject(err);
            console.log(err);
         } else {
            resolve(rows[0]);
         }
      });
   });
};

// Mostrar las preguntas
const getPreguntas = () => {
   return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT * FROM tbl_preguntas_usuario', (err, responses) => {
         if (err) {
            reject(err);
            console.log(err);
         } else {
            resolve(responses);
         }
      });
   });
};

// Obtener respuestas por usuario
const getRespuestas = (id_usuario, id_preguntas) => {
   return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT * FROM tbl_respuestas_usuario WHERE id_usuario = ? AND id_preguntas = ?', [id_usuario, id_preguntas], (err, result) => {
         if (err) {
            reject(err);
            console.log(err);
         } else {
            resolve(result[0]);
         }
      });
   });
};

// Obtener la información de tbl_parametros para los intentos permitidos
const getParametros = (id_usuario) => {
   return new Promise((resolve, reject) => {
      mysqlConnection.query('SELECT * FROM tbl_parametros WHERE id_usuario = ?', [id_usuario], (err, result) => {
         if (err) {
            reject(err);
            console.log(err);
         } else {
            resolve(result[0]);
         }
      });
   });
};

// actualizamos el estado del usuario cuando llego al limite de intentos
const updateIndicador = (indicador, id) => {
   return new Promise((resolve, reject) => {
      mysqlConnection.query('UPDATE tbl_usuario SET indicador_usuario = ? WHERE id_usuario = ?', [indicador, id], (err, rows) => {
         if (err) {
            reject(err);
            console.log(err);
         } else {
            resolve(rows[0]);
         }
      });
   });
};

module.exports = {
   getEmail,
   getUsuario,
   putUsuario,
   postToken,
   postPassword,
   limpiarToken,
   postRespuestas,
   getRespuestas,
   tokenPreguntas,
   getPreguntas,
   getParametros,
   updateIndicador,
};
