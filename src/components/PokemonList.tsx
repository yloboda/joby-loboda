import React, {useEffect, useState} from 'react';
import {IModal, IPokemon} from '../models';
import {Box, Button} from '@mui/material';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {ModalBox} from '../shared/Modal';
import {ShowDetails} from './showDetails';

interface PokemonProps {
    value: IPokemon | null;
    onSelect: (value: boolean) => void;
}

export function PokemonList({value, onSelect}: PokemonProps) {
    let [pokemons, setPokemons] = useState<(IPokemon | null)[]>([...Array(6).fill(null)]);
    const [open, setOpen] = useState(false);
    const clonePokemons: (IPokemon | null)[] = [...pokemons];
    const [pokemon, setPokemon] = useState<IPokemon | null>(null);

    const handleOpen = (pokemon: IPokemon | null) => {
        setOpen(true);
        setPokemon(pokemon);
    }

    onSelect(pokemons.every(item => Boolean(item)));

    useEffect(() => {
        let isPokemonsFilled:string | null = localStorage.getItem('selectedPokemons');
        if (isPokemonsFilled) {
            setPokemons(JSON.parse(localStorage.getItem('selectedPokemons') || '{}'));
        }
    }, []);

    const removeCard = (pokemon: IPokemon | null) => {
        const index = clonePokemons.indexOf(pokemon);
        if (index > -1) {
            clonePokemons[index] = null;
        }
        setupPokemonsStorage(clonePokemons);
    }

     useEffect(() => {
         if(value) {
             const idx = clonePokemons.findIndex(item => item === null);
             clonePokemons[idx] = {...value};
             setupPokemonsStorage(clonePokemons);
         }
    }, [value]);

    function setupPokemonsStorage(pokemons: (IPokemon | null)[]){
        setPokemons(pokemons);
        localStorage.setItem( 'selectedPokemons', JSON.stringify(clonePokemons) );
    }

    function handleOnDragEnd(result:any) {
        if (!result.destination) return;

        const [reorderedItem] = clonePokemons.splice(result.source.index, 1);
        clonePokemons.splice(result.destination.index, 0, reorderedItem);

        setupPokemonsStorage(clonePokemons);
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="drag-drop-list" direction="horizontal">
                {(provided) => (
                    <Box sx={{ display: 'flex' }} {...provided.droppableProps} ref={provided.innerRef}>
                        {pokemons.map((pokemon: IPokemon | null, idx: number) => (
                            <Draggable
                                key={String(idx)}
                                draggableId={String(idx)}
                                index={idx}>
                                {(provided) => (
                                    <Box
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={pokemon ? 'pokemon-card' : 'pokemon-card disable-card'}
                                        key={idx}
                                        sx={{
                                            width: 225,
                                            height: 320,
                                            m: 0.5,
                                        }}>
                                        {pokemon && <Button
                                          className="close-btn"
                                          onClick={() => removeCard(pokemon)}
                                          sx={{
                                              position: 'absolute',
                                              top: 0,
                                              right: 8,
                                              fontSize: 13
                                          }}
                                        >Close X
                                        </Button>}
                                        {pokemon && <Box
                                          pr={1.5}
                                          pl={1.2}
                                          m={1}
                                          sx={{
                                              background: '#fff',
                                              color: '#000',
                                              textTransform: 'capitalize',
                                              lineHeight: 2,
                                              borderTopLeftRadius:5,
                                              borderTopRightRadius:5,
                                              fontWeight: 'bold'
                                          }}>
                                            {pokemon?.name}
                                        </Box>}
                                        {pokemon &&<Button
                                          onClick={() => handleOpen(pokemon)}
                                          size="small" variant="contained"
                                          className="show-more-btn"
                                          sx={{
                                              position: 'absolute',
                                              bottom: 24,
                                              right: 3,
                                              color: '#fff',
                                              fontSize: 13
                                          }}
                                        >
                                          Open modal
                                        </Button>}
                                    </Box>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </Box>
                )}
            </Droppable>
            <div>
                <ModalBox<IModal<IPokemon | null>>
                    onClose={() => setOpen(false)}
                    open={open}
                    props={pokemon}>
                        <ShowDetails pokemon={pokemon}/>
                </ModalBox>
            </div>
        </DragDropContext>
    )
}