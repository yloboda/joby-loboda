import Axios from 'axios';
import {useEffect, useState} from 'react';

export function usePokemons() {
    const [error, setError] = useState('');
    const [pokemons, setPokemons] = useState([]);

    const options = {
        method: 'POST',
        url: 'https://beta.pokeapi.co/graphql/v1beta',
        data: {
            "query": `query samplePokeAPIquery { pokemon_v2_pokemonspecies { id name } }`,
        }
    };

    const fetchData = async () => {
        setError('');
        Axios
            .request(options)
            .then((response)  => {
                setPokemons(response.data.data.pokemon_v2_pokemonspecies);
            })
            .catch((error) => {
                setError(error.message);
            })
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {pokemons, error}
}