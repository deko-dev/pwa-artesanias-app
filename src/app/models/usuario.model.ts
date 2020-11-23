export interface UsuarioModel {
    _id?: string,
    rol: {
        type: String,
        required: true
    },
    tipoId: {
        type: String,
        required: true
    },
    nid: {
        type: String,
        required: true
    },
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String
    },
    nacimiento: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    telefono: {
        type: Number
    },
    direccion: {
        type: String
    } 
}