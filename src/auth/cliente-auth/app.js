
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-login');
  const saida = document.getElementById('saida');

  if (!form) {
    console.error("Erro: O formulário com id 'form-login' não foi encontrado.");
    return;
  }

  form.addEventListener('submit', async (event) => {
   
    event.preventDefault();

    
    const dadosFormulario = new FormData(form);
    const payload = Object.fromEntries(dadosFormulario.entries());

    try {
 
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const corpo = await response.json();

      
      saida.textContent = JSON.stringify(
        {
          statusHttp: response.status,
          sucesso: response.ok,
          resposta: corpo,
        },
        null,
        2
      );
    } catch (erro) {
     
      saida.textContent = JSON.stringify(
        {
          erro: 'Erro ao conectar à API',
          detalhe: erro.message,
        },
        null,
        2
      );
    }
  });
});