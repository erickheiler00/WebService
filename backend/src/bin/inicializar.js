import app from '../app.js'

// inicializa o servidor
app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000: http://localhost:3000/');
});

// para inicializar:
// npm run dev