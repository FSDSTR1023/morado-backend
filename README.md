# morado-backend

RETO HOTEL ROYAL MANZANARES

ENTIDADES:

GERENTE: crea , modifica o elimina las habitaciones. Tambien gestiona las reservas creadas por los usuarios,
HABITACIONES: se gestiona el numero de camas, tipo de cama , tipo de suite y el precio por noche,
RESERVA: se establece la fecha de entrada y salida ,
USUARIOS: crea, confirma o elimaina una reserva. Al confirmar la reserva recibira un email ,

# entidades mongoose

```js
La entidad "user" =

const userSchema = new Schema({
    
    nombre: {
        type : String,
        required: true
    },
    apellido: {
        type : String,
        required: true
    },
    phone: {
        type : Number,
        required: true
    },
    email: {
        type : String,
        required: true,
        unique: true
    },
    nacionalidad: {
        type : String,
        required: true
    },
    docType: {
        type : String,
        required : true
    },
    docNum: {
        type : String,
        required : true
    },
    userName: {
        type : string,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : true
    },
    
    isAdmin: {
        type : Boolean,
        default: false
    }
});

//Añadir reserva en user

La entidad "habitacion" =

const roomSchema = new Schema({
    
    roomNumber: { 
        type: String,
        required: true
    },
    roomName: {
        type: String,
        required: true
    },
    isSuite: {
        type: Boolean,
        default: true
    },
    roomType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comodidades: {
        type: String,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    maxPerson: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    bedNumber: {
        type: Number,
        required: true
    },
    bedType: {
        type: String,
        required: true
    },
    image: {
        nombre: { 
            type : String
            },
        datos: {
            type : Buffer
            }, 
        contentType: {
            type : String
            }
    },

});

La entidad "reserva" = 

const BookSchema = new Schema ({

    bookReference: {
        type: Number,
        required: true
    }

});

```
