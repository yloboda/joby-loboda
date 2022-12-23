export interface IPokemon {
    id: number,
    name: string
}

export interface IErrorMessage {
    error: string
}


export interface IModal<T> {
    open: boolean;
    onClose: () => void;
    children?: any;
    props?: T;
}