import './MovieApp.css'
import  { useState } from 'react';

export const MovieApp = () => {
    const [search, setSearch] = useState('')
    const [movieList, setMovieList] = useState([])
    const urlBase='https://api.themoviedb.org/3/search/movie'
    const apiKey='acá hay que poner a la ApKey'

    const handleInputChange=(event)=>{
     setSearch(event.target.value)
     console.log(event.target.value)
    }
    const handleSubmit=(event)=>{
        event.preventDefault()
        fetchMovie()

    }

    const fetchMovie= async() =>{
         try {
             const response= await fetch(`${urlBase}?query=${search}&api_key=${apiKey}&language=es-ES`)
             const data= await response.json()
             setMovieList(data.results)
             
         } catch (error) {
             console.error("Error: ",error)
         }
    }

  return (
    <div className='contanier'>
        <h1>Buscador de Películas</h1>
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            placeholder='escribí una película'
            value={search} 
            onChange={handleInputChange}
            />

            <button className='searchButton'>Buscar</button>
        </form>
        {movieList&&
            <div className='movie-list'>
                {movieList.map(movie=>(
                    <div key={movie.id} className='movie-card'>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}.jpg`} alt={movie.title} />
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                    </div>)
                )}
            </div>

         }
        
    </div>
  )
}
