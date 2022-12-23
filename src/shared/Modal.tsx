import React from 'react';
import Modal from '@mui/material/Modal';
import {IModal, IPokemon} from '../models';

export function ModalBox<T extends IModal<IPokemon | null>>({onClose, open, children, props}:T) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <section>
                {React.cloneElement(children, { props })}
            </section>
        </Modal>
    )
}