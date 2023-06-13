const React = require('react')

function LoopPage(props) {
    return (
        <>
            <h1>{props.title}</h1>
            <ul>
                {
                    props.livros.map((livro, i) =>{
                        return <li key={i}>{livro.titulo} - {livro.autor} - {livro.editora} - {livro.ano} - {livro.edicao} - {livro.genero} </li>
                    })
                }   
            </ul>
        </>
    )
}

module.exports = LoopPage
