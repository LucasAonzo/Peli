let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
const contenedor = document.getElementById('contenedor');
const paginas = document.getElementById('pagina');
const modal = document.querySelector('.modala');
const closeModal = document.querySelector('.modal__close');

btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarPeliculas();
		let pag = '';
		pag += `
			<p id="pagina">${pagina}</p>
		`;
		document.getElementById('pagina').innerHTML = pag;
		
	}
	window.scrollTo(0, 0);
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPeliculas();
		let pag = '';
		pag += `
			<p id="pagina">${pagina}</p>
		`;
		document.getElementById('pagina').innerHTML = pag;

	}
	window.scrollTo(0, 0);
});

const cargarPeliculas = async() => {
	try {
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`);
	
		console.log(respuesta);

		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
			
			let peliculas = '';
			datos.results.forEach(pelicula => {
				peliculas += `
					<div class="pelicula" id=${pelicula.id}>
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title}</h3>
                        
                        
                        

					</div>
				`;
			});

			document.getElementById('contenedor').innerHTML = peliculas;

		} else if(respuesta.status === 401){
			console.log('Pusiste la llave mal');
		} else if(respuesta.status === 404){
			console.log('La pelicula que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

	} catch(error){
		console.log(error);
	}

}

cargarPeliculas();


contenedor.addEventListener('click', (e) => {
	if(e.target.classList.contains('poster')){
		const id = e.target.parentElement.id;
		console.log(id);
		modal.classList.add('modal--show');
		const respuesta = fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX`);
		respuesta.then(res => res.json())
		.then(datos => {
			console.log(datos);
			let modal = '';
			modal += `

				<div class="modal__content">
					<img class="modal__img" src="https://image.tmdb.org/t/p/w500/${datos.poster_path}">
					<h3 class="modal__title">${datos.title}</h3>
					<p class="modal__text">${datos.overview}</p>
					<a href="#" class="modal__close" id="modal__close">Cerrar</a>
				</div>
			`;
			
			document.querySelector('.modala').innerHTML = modal;
						
			
		}
		).catch(error => console.log(error));
	}
}
);

		

closeModal.addEventListener('click', (e)=>{
    e.preventDefault();
    console.log('click');
});


modala.addEventListener('click', (e) => {
	if(e.target.id === 'modal__close'){
		modal.classList.remove('modal--show');
	}
}
);

// when click outside of modal, it will be closed
window.addEventListener('click', (e) => {
	if(e.target.classList.contains('modala modal--show')){
		console.log("click");
	}
}
);
