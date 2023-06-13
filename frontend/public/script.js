((window, document, undefined) => {
    const render = ($target, data) => {
        const trs = data.map(livro => {
            return `<tr>
                <td>${livro._id}</td>
                <td>${livro.titulo}</td>
                <td>${livro.autor}</td>
                <td>${livro.editora}</td>
                <td>${livro.ano}</td>
                <td>${livro.edicao}</td>
                <td>${livro.genero}</td>
            </tr>`
        })
        $target.find('tbody').html(trs.join(''))
    }
    const $target = $('#target')
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/livro'
    })
    .then(data => render($target, data))
})(window, document)