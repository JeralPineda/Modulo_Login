(() => {
   // Extraemos el token del local estorage para comprobar que existe
   const validToken = localStorage.getItem('token');

   if (!validToken) {
      $('#formLogin').on('submit', async (e) => {
         e.preventDefault();

         const correo = $('#correo').val();
         const password = $('#password').val();

         if (correo.length >= 4 && password.length >= 4) {
            datos = {
               correo,
               password,
            };

            try {
               const res = (await axios.post('/api/v1/auth/login', datos)).data;

               const { sesion, email } = res.user;

               if (sesion === 0) {
                  //    Si la session es 0 = true significa que es nuevo en el sistema

                  // hacemos la petición
                  const resp = (await axios.post('/api/v1/auth/preguntas_login', { email })).data;

                  localStorage.setItem('token_respuestas', resp.token);

                  Swal.fire({
                     icon: 'error',
                     text: resp.message,
                     showConfirmButton: false,
                     timer: 2000,
                  }).then(() => {
                     // limpiamos el formulario
                     $('#formLogin')[0].reset();

                     // Redireccionar
                     const url = '/auth/respuestas';
                     $(location).attr('href', url);
                  });
               } else {
                  // Extraemos el token y lo guardamos en localstorage
                  const { token } = res;
                  localStorage.setItem('token', token);

                  Swal.fire({
                     icon: 'success',
                     text: res.message,
                     showConfirmButton: false,
                     timer: 1500,
                  }).then(() => {
                     // limpiamos el formulario
                     $('#formLogin')[0].reset();

                     // Redireccionar
                     const url = '/home';
                     $(location).attr('href', url);
                  });
               }
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
                  $('#formLogin')[0].reset();
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
