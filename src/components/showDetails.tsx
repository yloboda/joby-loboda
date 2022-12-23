import React from 'react';
import {Box, Typography} from '@mui/material';
import {IPokemon} from '../models';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface PokemonProps {
    pokemon: IPokemon | null;
}

export function ShowDetails({pokemon}:PokemonProps) {
    return (
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {pokemon?.name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Pokemon id: {pokemon?.id}
            </Typography>
        </Box>
    )
}