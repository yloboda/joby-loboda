import React, {SyntheticEvent, useRef, useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {IPokemon} from '../models';

interface IPokemonProps {
    pokemons: IPokemon[];
    onSearch: (value: IPokemon | null) => void;
}

export function SearchForm({pokemons, onSearch}: IPokemonProps) {
    const [value, setValue] = useState('');

    const autoValueClear = useRef(null);

    const changeHandler = (event: SyntheticEvent<Element, Event>, value: IPokemon | null) => {
        setValue(value ? value.name : '');
        onSearch(value);
    }

    return (
        <div className="mb-4">
            <Autocomplete
                onChange={changeHandler}
                id="combo-box-demo"
                getOptionLabel={(option) => option.name || ""}
                options={pokemons}
                sx={{
                    width: 500,
                    mb: 2
                }}
                value={null}
                blurOnSelect={true}
                ref={autoValueClear}
                renderInput={(params) =>
                    <TextField {...params} label="Choose Pokemon team member" />
                }
            />
        </div>
    )
}
