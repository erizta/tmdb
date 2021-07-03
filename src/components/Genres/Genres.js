import axios from "axios"
import { useEffect } from "react"
import { Chip } from "@material-ui/core"

const Genres = ({
    type,
    genres,
    setPage,
    setGenres,
    selectedGenres,
    setSelectedGenres,
}) => {

    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre])
        setGenres(genres.filter((g) => g.id !== genre.id))
        setPage(1)
    }

    const handleRemove = (genre) => {
        setSelectedGenres(selectedGenres.filter((selected) => selected.id !== genre.id))
        setGenres([...genres, genre])
        setPage(1)
    }


    const fetchGenres = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        )
        setGenres(data.genres)
    }

    useEffect(() => {
        fetchGenres()

        return () => {
            setGenres({})
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div style={{ padding: "8px 0" }}>
            {
                selectedGenres && selectedGenres.map((genre) => (
                    <Chip
                        key={genre.id}
                        label={genre.name}
                        style={{ margin: 7, fontSize: '14px' }}
                        color="primary"
                        onDelete={() => handleRemove(genre)}
                        clickable
                    />
                ))
            }
            {
                genres && genres.map((genre) => (
                    <Chip
                        key={genre.id}
                        label={genre.name}
                        style={{ margin: 7 }}
                        variant="outlined"
                        onClick={() => handleAdd(genre)}
                        clickable
                    />
                ))
            }
        </div>
    )
}

export default Genres
