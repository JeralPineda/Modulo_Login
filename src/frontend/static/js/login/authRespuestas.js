(() => {
   // Extraemos el token del local estorage para comprobar que existe
   const token = localStorage.getItem('token_respuestas');

   //    validamos que el token exista
   if (token) {
      $('#formRespuestas').on('submit', async (e) => {
         e.preventDefault();

         const respuesta1 = $('#respuesta').val();
         const respuesta2 = $('#respuesta2').val();

         if (respuesta1.length >= 4 && respuesta2.length >= 4) {
            // Guardamos el token en el headers para enviarlo por axios
            const headers = { Authorization: `Bearer ${token}` };

            datos = {
               respuesta1,
               respuesta2,
            };

            try {
               const res = (await axios.post(`/api/v1/auth/preguntas`, datos, { headers })).data;

               Swal.fire({
                  icon: 'success',
                  text: res.message,
                  showConfirmButton: false,
                  timer: 2500,
               }).then((result) => {
                  // limpiamos el formulario
                  $('#formRespuestas')[0].reset();

                  // Redireccionar
                  const url = '/auth/login';
                  $(location).attr('href', url);

                  //   Limpiamos el token-meiler del localStorage
                  localStorage.removeItem('token_respuestas');
               });
            } catch (error) {
               // Accedemos al message de la data del error y lo guardamos
               const message = error.response.data.message;

               Swal.fire({
                  icon: 'error',
                  title: message,
                  showConfirmButton: false,
                  timer: 1500,
               }).then(() => {
                  // limpiamos el formulario
                  $('#formRespuestas')[0].reset();

                  // Redireccionar
                  const url = '/auth/login';
                  $(location).attr('href', url);
               });
            } //Fin tryCatch
         } else {
            //   Si el usuario ingresa mal un campo
            Swal.fire({
               icon: 'error',
               title: 'Debes completar los campos correctamente',
               showConfirmButton: false,
               timer: 1500,
            });
         } //Fin if para validar los campos
      });
   } else {
      //  Si no existe el token me redirige al login
      const url = '/auth/login';
      $(location).attr('href', url);
   } //Fin if para token
})();
