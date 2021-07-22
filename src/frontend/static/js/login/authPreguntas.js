(() => {
   // Extraemos el token del local estorage para comprobar que el usuario esta logeado o no
   const validToken = localStorage.getItem('token');

   if (!validToken) {
      $('#formPreguntas').on('submit', async (e) => {
         e.preventDefault();

         const correo = $('#correo').val();
         const pregunta = $('#pregunta').val();
         const respuesta = $('#respuesta').val();

         if (correo.length >= 4 && respuesta.length >= 2) {
            datos = {
               correo,
               pregunta,
               respuesta,
            };

            try {
               const res = (await axios.post('/api/v1/auth/recuperarPorPreguntas', datos)).data;

               // Extraemos el token y lo guardamos en localstorage
               const { token } = res;
               localStorage.setItem('token-meiler', token);

               Swal.fire({
                  icon: 'success',
                  text: res.message,
                  showConfirmButton: false,
                  timer: 1500,
               }).then(() => {
                  // limpiamos el formulario
                  $('#formPreguntas')[0].reset();

                  // Redireccionar
                  const url = '/auth/new_password';
                  $(location).attr('href', url);
               });
            } catch (error) {
               // Accedemos al message de la data del error y lo guardamos
               const message = error.response.data.message;

               Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: message,
                  showConfirmButton: false,
                  timer: 1500,
               }).then(() => {
                  // limpiamos el formulario
                  $('#formPreguntas')[0].reset();
               });
            }
         } else {
            //   Si el usuario i ngresa mal un campo
            Swal.fire({
               icon: 'error',
               title: 'Debes completar los campos correctamente',
               showConfirmButton: false,
               timer: 1500,
            });
         }
      });
   } else {
      //   Redireccionamos si no existe el token
      const url = '/home';
      $(location).attr('href', url);
   }
})();
