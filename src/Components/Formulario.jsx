import {useState} from 'react'
import Error from './Error'

const Formulario = ({setBusqueda}) => {

    const [termino, setTermino] = useState('')
    const [error, setError] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()

        if(termino.trim() === ''){  
            setError(true)
            return;
        }
        setError(false)

        //enviar al componente principal
        setBusqueda(termino)
    }
    return (
            <form
                onSubmit={handleSubmit}
            >
                <div className='row'>
                    <div className='form-group col-md-8'>
                        <input
                            type="text"
                            className= "form-control form-control-lg"
                            placeholder = "Busca una Imagenes, Ej: futbol cafe"
                            onChange={e => setTermino(e.target.value)}
                        />
                    </div>
                    <div className='form-group col-md-4'>
                        <input
                            type="submit"
                            className= "btn btn-lg btn-danger btn-block"
                            value="Buscar"
                        />
                    </div>
                </div>
                {error ? <Error mensaje = "Agrega una Categoria de imagenes a buscar"/> : null}
            </form>
    )
}

export default Formulario
