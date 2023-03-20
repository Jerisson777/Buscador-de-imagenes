import { useState, useEffect } from 'react'
import Formulario from './Components/Formulario'
import ListadoImagenes from './Components/ListadoImagenes'

function App() {

  const [busqueda, setBusqueda] = useState('')
  const [imagenes, setImagenes] = useState([])
  const [paginaActual, setPaginaActual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)

  useEffect(() => {
    const consultaApi = async () => {
      if(busqueda === '') return;
      const imagenesPorPaginas = 30
      const key = '24891973-d3520483616430a28da5c2092'
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPaginas}&page=${paginaActual}`

      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      setImagenes(resultado.hits)

      //CalculaR NUMEROS DE PAGINACION
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPaginas)
      setTotalPaginas(calcularTotalPaginas)

      //hacer scroll cuando sea la pagina siguiente
      const jumbotron = document.querySelector('.jumbotron')
      jumbotron.scrollIntoView({behavior: 'smooth'});
    }
    consultaApi()
  }, [busqueda, paginaActual])

  const paginaAnterior = () => {
    const nuevaActual = paginaActual - 1;

    if(nuevaActual === 0) return
    setPaginaActual(nuevaActual)
  }

  const paginaSiguiente = () => {
    const nuevaActual = paginaActual + 1;

    if(nuevaActual > totalPaginas) return
    setPaginaActual(nuevaActual)
  }
  return (
    <div className='container'>
      <div className='jumbotron'>
        <p className='lead text-center'>Buscador de Imagenes</p>

        <Formulario
          setBusqueda={setBusqueda}
        />
      </div>
      <div className='row justify-content-center'>
        <ListadoImagenes
          imagenes={imagenes}
        />  
        { (paginaActual === 1) ? null : (
          <button
            type="button"
            className='btn- btn-info mr-1'
            onClick = {paginaAnterior}
          >&laquo; Anterior </button>

        )}

        { (paginaActual === totalPaginas) ? null : (
          <button
            type="button"
            className='btn- btn-info'
            onClick = {paginaSiguiente}
          >Siguiente &raquo;</button>
        )}
      </div>  
    </div>
  )
}

export default App
