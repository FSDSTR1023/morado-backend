# morado-backend
RETO HOTEL ROYAL MANZANARES

ENTIDADES: 

GERENTE: crea , modifica o elimina las habitaciones. Tambien gestiona las reservas creadas por los usuarios,
HABITACIONES: se gestiona el numero de camas, tipo de cama , tipo de suite y el precio por noche,
RESERVA: se establece la fecha de entrada y salida ,
USUARIOS: crea, confirma o elimaina una reserva. Al confirmar la reserva recibira un email ,

# entidades mongoose 

La entidad "user" = 

    Nombre : tipo String, requerido 
    Apellidos : tipo String, requerido
    Fecha de nacimiento : tipo Date, requerido // es necesario ser mayor de edad para hacer una reserva 
    Telefono : tipo Number
    Email : tipo String, requerido, unique, lowercase, trim, validate,  
    Pais : tipo String // colocar selector 
    DocumentoIdentidad : tipo DNI? 
    Rol : tipo Bolean : usuario comun o usuario master 

La entidad "habitacion" = 

    Nombre : tipo String 
    Nº camas : tipo Number
    Tipo cama : tipo String // selector 
    Clasificacion : tipo Boolean => habitacion, suite 
    Modelo Habitacion : tipo String // selector => individual, doble, triple
    Descripcion : tipo Text
    Tarifa : tipo Number 
    Estado : tipo String // selector => libre , reservada , fuera de servcio 

La entidad "reserva" =  


