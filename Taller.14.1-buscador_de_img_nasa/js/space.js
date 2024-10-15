document.getElementById('btnBuscar').addEventListener('click', function() {
    
    const query = document.getElementById('inputBuscar').value;
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`;

    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = '';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            if (data.collection.items.length === 0) {
                contenedor.innerHTML = '<p>No se encontraron imágenes.</p>';
                return;
            }

            data.collection.items.forEach(item => {
                const { links, data: itemData } = item;

                
                if (links && links.length > 0) {
                    const imgUrl = links[0].href;
                    const title = itemData[0].title;
                    const description = itemData[0].description || 'Sin descripción';
                    const date = itemData[0].date_created || 'Sin fecha';

                    const imgElement = document.createElement('div');
                    imgElement.classList.add('col');
                    imgElement.innerHTML = `
                        <div class="row row-cols-1 row-cols-md-3 g-4">
                            <div class="card">
                            <img src="${imgUrl}" class="card-img-top" alt="${title}">
                            <div class="card-body">
                                <h5 class="card-title">${title}</h5>
                                <p class="card-text">${description || 'No hay descripción disponible.'}</p>
                            </div>
                            <div class="card-footer>
                             <p class="card-text"><small class="text-muted">Fecha:${date || "Sin fecha"}</small>
                            </div>
                        </div>
    
                    `;
                    contenedor.appendChild(imgElement);
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
            contenedor.innerHTML = '<p>Error al realizar la búsqueda.</p>';
        });
});
