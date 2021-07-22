(() => {
   let userData;
   const pregunta = $('#formPreguntas #pregunta');

   const getPreguntas = async () => {
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
   getPreguntas();
})();
