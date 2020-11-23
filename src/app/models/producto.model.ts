export interface ProductoModel {
    _id?: string
    idUser: string,
    nombre: string,
    descripcion?: string
    imagen?: File,
    nameImage?: string
    precio: string,
    stock: string
}