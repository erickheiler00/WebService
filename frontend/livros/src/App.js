import './App.css'
import {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import React from 'react';


// renderiza o cabecalho da tabela a partir da propriedade generos
function THeadG(props) {
  return (
    <thead>
      <tr> 
        { props.generos.map((genero,i) => <th key={i}>{genero}</th>) }
      </tr>
    </thead>
  )
}

// renderiza o corpo da tabela com todos os generos cadastrados
// cada linha é renderizada por meio do TLine
function TBodyG(props) {
  return (
    <tbody>
    {
      props.generos?.map(genero => {
        return <TLineG key={genero._id} genero={genero} />
      })
    }
    </tbody>
  )
}

// renderiza uma linha da tabela
function TLineG(props) {
  return (
    <tr>
      <td>{props.genero._id}</td>
      <td>{props.genero.nome}</td>
    </tr>
  )
}

// renderiza o cabecalho da tabela a partir da propriedade editoras
function THeadE(props) {
  return (
    <thead>
      <tr> 
        { props.editoras.map((editora,i) => <th key={i}>{editora}</th>) }
      </tr>
    </thead>
  )
}

// renderiza o corpo da tabela com todos as editoras cadastradas
// cada linha é renderizada por meio do TLine
function TBodyE(props) {
  return (
    <tbody>
    {
      props.editoras?.map(editora => {
        return <TLineE key={editora._id} editora={editora} />
      })
    }
    </tbody>
  )
}

// renderiza uma linha da tabela
function TLineE(props) {
  return (
    <tr>
      <td>{props.editora._id}</td>
      <td>{props.editora.nome}</td>
    </tr>
  )
}

// renderiza o cabecalho da tabela a partir da propriedade autores
function THeadA(props) {
  return (
    <thead>
      <tr> 
        { props.autores.map((autor,i) => <th key={i}>{autor}</th>) }
      </tr>
    </thead>
  )
}

// renderiza o corpo da tabela com todos os autores cadastrados
// cada linha é renderizada por meio do TLine
function TBodyA(props) {
  return (
    <tbody>
    {
      props.autores?.map(autor => {
        return <TLineA key={autor._id} autor={autor} />
      })
    }
    </tbody>
  )
}

// renderiza uma linha da tabela
function TLineA(props) {
  return (
    <tr>
      <td>{props.autor._id}</td>
      <td>{props.autor.nome}</td>
      <td>{props.autor.pais}</td>
    </tr>
  )
}

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
  const handleDeleteClick = (livroId) => {
    props.delete(livroId);
  };

  return (
    <tbody>
    {
      props.livros?.map(livro => {
        return <TLine key={livro._id} livro={livro} generos={props.generos} editoras={props.editoras} autores={props.autores} onDelete={handleDeleteClick}/>
      })
    }
    </tbody>
  )
}

// renderiza uma linha da tabela
// <td>{props.livro.genero.nome}</td>
function TLine(props) {
  const genero = props.generos.find(genero => genero._id === props.livro.genero);
  const editora = props.editoras.find(editora => editora._id === props.livro.editora);
  const autor = props.autores.find(autor => autor._id === props.livro.autor);
  const handleDeleteClick = () => {
    props.onDelete(props.livro._id);
  };

  return (
    <tr>
      <td>{props.livro._id}</td>
      <td>{props.livro.titulo}</td>
      <td>{autor ? autor.nome : ''}</td>
      <td>{editora ? editora.nome : ''}</td>
      <td>{props.livro.ano}</td>
      <td>{props.livro.edicao}</td>
      <td>{genero ? genero.nome : ''}</td>
      <td><button onClick={handleDeleteClick}>Deletar</button></td>
    </tr>
  )
}

function App() {
  // declarando a variavel de estado genero, editora, autor, livro como arrays vazios
  // useState declara a variavel
  // sets atualizam o valor dela
  const [genero, setGenero] = useState([])
  const [editora, setEditora] = useState([])
  const [autor, setAutor] = useState([])
  const [livro, setLivro] = useState([]) 
  const [token, setToken] = useState(null) // adiciona o estado para o token

  // TOKEN
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

  // GENERO
  useEffect(() => {
    // chamada da API utilizando fetch
    // faz a requisicao dos generos com o token
    if (token) {
      fetch('http://localhost:3000/genero', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json()) // converte a resposta em json
      .then(data => setGenero(data.sort((a, b) => (a.nome > b.nome ? 1 : -1)))) // dados sao atribuidos a variavel genero
      .catch(error => {
        console.error('Erro ao obter generos', error);
      });
    }
  }, [token]);

  // EDITORA
  useEffect(() => {
    // chamada da API utilizando fetch
    // faz a requisicao das editoras com o token
    if (token) {
      fetch('http://localhost:3000/editora', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json()) // converte a resposta em json
      .then(data => setEditora(data.sort((a, b) => (a.nome > b.nome ? 1 : -1)))) // dados sao atribuidos a variavel editora
      .catch(error => {
        console.error('Erro ao obter editoras', error);
      });
    }
  }, [token]);

  // AUTOR
  useEffect(() => {
    // chamada da API utilizando fetch
    // faz a requisicao dos autores com o token
    if (token) {
      fetch('http://localhost:3000/autor', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json()) // converte a resposta em json
      .then(data => setAutor(data.sort((a, b) => (a.nome > b.nome ? 1 : -1)))) // dados sao atribuidos a variavel autor
      .catch(error => {
        console.error('Erro ao obter autores', error);
      });
    }
  }, [token]);

  // LIVRO
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
    .then(data => setLivro(data.sort((a, b) => (a.titulo > b.titulo ? 1 : -1)))) // dados sao atribuidos a variavel livro
    .catch(error => {
      console.error('Erro ao obter livros', error);
    });
  }
  }, [token]);

  // CADASTRO DE LIVRO
  const handleCreateLivro = (event) => {
    event.preventDefault();

    const form = event.target;
    const titulo = form.elements.titulo.value;
    const autorId = form.elements.autor.value;
    const editoraId = form.elements.editora.value;
    const ano = parseInt(form.elements.ano.value);
    const edicao = parseInt(form.elements.edicao.value);
    const generoId = form.elements.genero.value;

    const novoLivro = {
      titulo,
      autor: autorId,
      editora: editoraId,
      ano,
      edicao,
      genero: generoId,
    };

    fetch('http://localhost:3000/livro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(novoLivro),
    })
      .then((res) => res.json())
      .then((data) => {
        // Atualizar o estado dos livros com o novo livro
        setLivro((livros) => [...livros, data]);
      })
      .catch((error) => {
        console.error('Erro ao criar livro:', error);
      });

    // Limpar os campos do formulário
    form.reset();
  };

  // EXCLUSÃO DE LIVRO
  const handleDeleteLivro = (livroId) => {
    fetch(`http://localhost:3000/livro/${livroId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLivro((livros) => livros.filter((livro) => livro._id !== livroId));
      })
      .catch((error) => {
        console.error('Erro ao deletar livro:', error);
      });
  };



// renderiza a tabela no navegador utilizando THead e TBody
  return (
<Router>
      <div className="container">
        <nav className="navbar">
            <NavLink to="/livros" className="nav-link" activeClassName="active">
              Livros
            </NavLink>
            <NavLink to="/autores" className="nav-link" activeClassName="active">
              Autores
            </NavLink>
            <NavLink to="/editoras" className="nav-link" activeClassName="active">
              Editoras
            </NavLink>
            <NavLink to="/generos" className="nav-link" activeClassName="active">
              Gêneros
            </NavLink>
          </nav>

        <Routes>
            <Route path="/generos" element={
              genero.length > 0 ? (
                <table className="table">
                  <THeadG generos={['ID', 'Nome']} />
                  <TBodyG generos={genero} />
                </table>
              ) : (
                <p>Não há gêneros disponíveis.</p>
              )
            }
          />

          <Route path="/editoras" element={
            editora.length > 0 ? (
              <table className="table">
                <THeadE editoras={['ID', 'Nome']} />
                <TBodyE editoras={editora} />
              </table>
            ) : (
              <p>Não há editoras disponíveis.</p>
            )
          } />

          <Route path="/autores" element={
            autor.length > 0 ? (
              <table className="table">
                <THeadA autores={['ID', 'Nome', 'País']} />
                <TBodyA autores={autor} />
              </table>
            ) : (
              <p>Não há autores disponíveis.</p>
            )
          } />

          <Route path="/livros" element={
            <div>
              {livro.length > 0 ? (
                <table className="table">
                  <THead livros={['ID', 'Título', 'Autor', 'Editora', 'Ano', 'Edição', 'Gênero']} />
                  <TBody livros={livro} generos={genero} editoras={editora} autores={autor} delete={handleDeleteLivro}/>
                </table>
              ) : (
                <p>Não há livros disponíveis.</p>
              )}
              <form onSubmit={handleCreateLivro}>
                <input type="text" name="titulo" placeholder="Título" required />
                <select name="autor" required>
                  <option value="">Selecione um autor</option>
                  {autor.map((author) => (
                    <option key={author._id} value={author._id}>
                      {author.nome}
                    </option>
                  ))}
                </select>
                <select name="editora" required>
                  <option value="">Selecione uma editora</option>
                  {editora.map((publisher) => (
                    <option key={publisher._id} value={publisher._id}>
                      {publisher.nome}
                    </option>
                  ))}
                </select>
                <input type="number" name="ano" placeholder="Ano" required />
                <input type="number" name="edicao" placeholder="Edição" required />
                <select name="genero" required>
                  <option value="">Selecione um gênero</option>
                  {genero.map((genre) => (
                    <option key={genre._id} value={genre._id}>
                      {genre.nome}
                    </option>
                  ))}
                </select>
                <button type="submit">Criar Livro</button>
              </form>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App