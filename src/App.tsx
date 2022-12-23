import React, {useEffect, useState} from 'react';

import {Container, Typography} from '@mui/material';

import { PokemonList } from './components/PokemonList';
import { SearchForm } from './components/SearchForm';
import { usePokemons } from './hooks/pokemons';
import { ErrorMessage } from './components/ErrorMessage';
import {IPokemon} from './models';

function App() {
    const {pokemons, error} = usePokemons();
    const [value, setValue] = useState<IPokemon | null>(null);
    const [isTeamReady, setIsTeamReady] = useState(false);

    const SelectHandler = (isTeamReady:boolean)=>
        useEffect(() => {
            setIsTeamReady(isTeamReady)
        }, [isTeamReady])


    return (
        <Container maxWidth="xl" sx={{ mx: 'auto' }}>
            <Typography variant="h5" component="h5" mb={1}>
                Create your own pokemon team
            </Typography>
            {isTeamReady && <h3>Pokemon Team is ready for work.</h3>}
            {!isTeamReady && <SearchForm pokemons={pokemons} onSearch={(value) => setValue(value)}/>}
            {error && <ErrorMessage error={error}/>}
            <PokemonList
                value={value}
                onSelect = {SelectHandler}
            />
      </Container>
  );
}

export default App;
