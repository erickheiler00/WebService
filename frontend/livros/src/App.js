import './App.css'
import {useState, useEffect} from 'react'

function THead(props) {
  return (
    <thead>
      <tr> 
        { props.livros.map((livro,i) => <th key={i}>{livro}</th>) }
      </tr>
    </thead>
  )
}
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
  const [livro, setLivro] = useState([])
/*
  useEffect(() => {
    fetch('http://localhost:3000/livro')
        .then(res => res.json())
        .then(data => setLivro(data))
  }, [])
*/
  useEffect(() => {
  fetch('http://localhost:3000/livro', {
    headers: {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoidXN1YXJpbzEiLCJleHAiOjE2ODcyODMyMTYyMTV9.fu3jl0ZPdlcdI9B0noh_YheTMUoEke5geLqYEtdKYjE'
    }
  })
    .then(res => res.json())
    .then(data => setLivro(data));
}, []);

/*
  useEffect(() => {
    console.log(livro)
  }, [livro])
*/

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