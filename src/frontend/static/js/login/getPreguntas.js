(() => {
   const getPregunta1 = async () => {
      let userData;
      const pregunta = $('#formRespuestas #pregunta1');

      try {
         const res = await axios.get('/api/v1/auth/preguntas');

         // guradamos los datos
         userData = res.data;

         let rep = userData.length;

         for (let i = 0; i < rep; i++) {
            pregunta.append(` <option value="${userData[i].id_preguntas}">${userData[i].pregunta}</option>`);
         }
      } catch (error) {
         // Accedemos al message de la data del error y lo guardamos
         const message = error.response.data.message;

         Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
         });
      }
   };

   // Mandamos a llamar la funcion
   getPregunta1();

   const getPregunta2 = async () => {
      let userData;
      const pregunta = $('#formRespuestas #pregunta2');

      try {
         const res = await axios.get('/api/v1/auth/preguntas');

         // guradamos los datos
         userData = res.data;

         let rep = userData.length;

         for (let i = 0; i < rep; i++) {
            pregunta.append(` <option value="${userData[i].id_preguntas}">${userData[i].pregunta}</option>`);
         }
      } catch (error) {
         // Accedemos al message de la data del error y lo guardamos
         const message = error.response.data.message;

         Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
         });
      }
   };

   // Mandamos a llamar la funcion
   getPregunta2();
})();
