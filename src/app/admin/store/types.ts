export interface Encuesta {
    id: number;
    description: string;
    title: string;
    fecha: string;
    questions: Question[]
}

export enum TypeQuestion {
    Multiple = "Opción multiple",
    Regular = "Respuesta simple"
}


export interface Question {
    id: number,
    name: string,
    type: TypeQuestion,
    options: string[]
}

export interface AdminState {
    encuestas: Encuesta[];
}
