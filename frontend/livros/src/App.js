import './App.css'
import {useState, useEffect} from 'react'

// renderiza o cabecalho da tabela a partir da propriedade livros
function THead(props) {
  return (
    <thead>
      <tr> 
        { props.livros.map((livro,i) => <th key={i}>{livro}</th>) }
      </tr>
    </thead>
  )
}

// renderiza o corpo da tabela com todos os livros cadastrados
// cada linha é renderizada por meio do TLine
function TBody(props) {
  return (
    <tbody>
    {
      props.livros?.map(livro => {
        return <TLine key={livro._id} livro={livro} />
      })
    }
    </tbody>
  )
}

// renderiza uma linha da tabela
function TLine(props) {
  return (
    <tr>
      <td>{props.livro._id}</td>
      <td>{props.livro.titulo}</td>
      <td>{props.livro.autor}</td>
      <td>{props.livro.editora}</td>
      <td>{props.livro.ano}</td>
      <td>{props.livro.edicao}</td>
      <td>{props.livro.genero}</td>
    </tr>
  )
}

function App() {
  // declarando a variavel de estado livro como um array vazio
  // useState declara a variavel
  // setLivro atualiza o valor dela
  const [livro, setLivro] = useState([]) 
  const [token, setToken] = useState(null) // adiciona o estado para o token

  useEffect(() => {
    // faz a requisição de login para obter o token
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'usuario1',
        password: '123'
      })
    })
      .then(res => res.json())
      .then(data => setToken(data.token))
      .catch(error => {
        console.error('Erro no login:', error);
      });
  }, []);


  useEffect(() => {
  // chamada da API utilizando fetch
  // faz a requisicao dos livros com o token
  if (token) {
    fetch('http://localhost:3000/livro', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json()) // converte a resposta em json
    .then(data => setLivro(data)) // dados sao atribuidos a variavel livro
    .catch(error => {
      console.error('Erro ao obter livros', error);
    });
  }
}, [token]);

// renderiza a tabela no navegador utilizando THead e TBody
  return (
    <>
      <h1>Livros</h1>
      { livro && <table id="target"> 
          <THead livros={['ID', 'Título', 'Autor', 'Editora', 'Ano', 'Edição', 'Gênero']} />
          <TBody livros={livro} />
      </table>}
    </>
  )
}

export default App