import React from 'react';
import {IErrorMessage} from '../models';

export function ErrorMessage({error}: IErrorMessage) {
    return (
        <div>
            <p className="text-red-600">{error}</p>
        </div>
    )
}