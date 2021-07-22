const mysqlConnection = require('../../../config/db');

// Obtener usuario por correo
const getEmail = (pEmail) => {
   return new Promise((resolve, reject) => {
      mysqlConnection.query(`SELECT * FROM usuario WHERE correo_usuario = ?`, [pEmail], (err, row) => {
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
      mysqlConnection.query(`SELECT * FROM usuario WHERE id_usuario = ?`, [id], (err, user) => {
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
      mysqlConnection.query('UPDATE  usuario SET token_respuestas = ?, fecha_registro = ? WHERE usuario.id_usuario = ?', [tokenPreguntas, fecha, id], (err, user) => {
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
      mysqlConnection.query('UPDATE usuario SET token_password = ? WHERE usuario.id_usuario = ?', [token, id], (err, row) => {
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
      mysqlConnection.query('UPDATE usuario SET password_usuario = ? WHERE usuario.id_usuario = ?', [id, password], (err, result) => {
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
      mysqlConnection.query('UPDATE usuario SET token_password = ? WHERE usuario.id_usuario = ?', [id, token_password], (err, rows) => {
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
      mysqlConnection.query('INSERT INTO respuestas_usuario(id_usuario, id_preguntas, respuesta, usr_registro, fecha_registro) VALUES ?', [respuestas], (err, resp) => {
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
      mysqlConnection.query('UPDATE usuario SET token_respuestas = ?, indicador_usuario = ?, primera_sesion = ?, fecha_registro = ? WHERE usuario.id_usuario = ?', [token_respuestas, indicador, sesion, fecha, id], (err, rows) => {
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
      mysqlConnection.query('SELECT * FROM preguntas_usuario', (err, responses) => {
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
      mysqlConnection.query('SELECT * FROM respuestas_usuario WHERE id_usuario = ? AND id_preguntas = ?', [id_usuario, id_preguntas], (err, result) => {
         if (err) {
            reject(err);
            console.log(err);
         } else {
            resolve(result[0]);
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
};
