const bookFinder = (event) => {
  event.preventDefault();

  var item, tile, author, publisher, bookLink, bookImg;

  var listaResultados = document.getElementById("lista-resultados");

  const textoBusqueda = document.querySelector('#buscadorLibros').value;

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${textoBusqueda}`)
      .then( (response) => response.json() )
      .then( data => {
          if( data === 0 || data === null ) {
            alert('Error');
          } else {
            for ( var i = 0; i < data.items.length; i+=2 ) {
              item = data.items[i];
              titulo1 = item.volumeInfo.title;
              autor1 = item.volumeInfo.authors;
              editor1 = item.volumeInfo.publisher;
              imagen1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr ;
      
              item2 = data.items[i+1];
              titulo2 = item2.volumeInfo.title;
              autor2 = item2.volumeInfo.authors;
              editor2 = item2.volumeInfo.publisher;
              imagen2 = (item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.thumbnail : placeHldr ;
      
              listaResultados.innerHTML += '<div class="row mt-4">' +
                                      formatOutput(imagen1, titulo1, autor1, editor1) +
                                      formatOutput(imagen2, titulo2, autor2, editor2) +
                                          '</div>';
      
              console.log(listaResultados);
            }
          }
      })
}

function formatOutput(bookImg, title, author, publisher) {
  var cajaHtml = `<div class="col-lg-6">
    <div class="card tarjeta" style="">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="${bookImg}" class="card-img" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Titulo: ${title}</h5>
            <p class="card-text">Autor: ${author}</p>
            <p class="card-text">Publicado por: ${publisher}</p>
          </div>
        </div>
      </div>
    </div>
  </div>`

  return cajaHtml;
}


document.querySelector("#btn-buscar").addEventListener("click", bookFinder);