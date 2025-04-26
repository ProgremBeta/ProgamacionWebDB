<h1>CONEXION A UNA BASE DE DATOS</h1>
<h2>Informacion general</h2>
<p>
Para este proyecto estamos usando

    - React
    - Node js v22.14.0
    - PostgreSQL 17.2

para instalar los paquetes usados en el proyecto ejecuta

    npm ci

esto funciona gracias al archivo "package-lock.json", esto te creara la carpeta "node_modules"

<h3>Paquetes</h3>
<ol>
    <li>Bcryptjs</li>
    <li>Cors</li>
    <li>Dotenv</li>
    <li>Express</li>
    <li>Jsonwebtoken</li>
    <li>nodemon</li>
    <li>Pg</li>
    <li>Pg-hstore</li>
    <li>Sequelize</li>
</ol>

</p>

<h2>Ejecuta el proyecto</h2>
<p>
Para ejecutar el proyecto usa el siguiente comando

    node src/server.js
o para ejecutarlo como desarrollador

    npm run dev

para que funcione tienes que estar en la carpeta principal del proyecto
</p>

<h2>Rutas</h2>
Si es un proyecto local se lanzara en un localhost, y para esto ya se habia definido el puerto en .env o se tiene:

    const PORT = process.env.PORT || 5500;

esto busca el puerto en el .env pero si no lo encuentra lo ejecuta en el puerto declarado al final de la linea

    http://localhost:3000

app.js contiene las rutas principales para el manejo del proyecto, las rutas son:

    /api/v1 - para userRouter
    /api/v1 - para authRoutes
    /api/v1 - para projectRoutes

server.js contiene la ruta para hacer el login, las rutas son:

    /auth/login - para login

user.routes.js contiene las rutas pra la gestion de usuarios como:

    /users/create - para crear usuarios
    /users/update/:id - para actualizar un usuario por id
    /users/ - para mostrar los usuarios de un admin
    /users/delete/:id - para eliminar un usuario por id
    /users/rol/:id - para mostrar todos los usuarios por rol (1 admin, 2 users)

project.routes.js contiene las rutas para la gestion de proyectos y son:

    /project/create - para crear un proyecto
    /project/update/:id - para actualizar un proyecto con id
    /project/delete/:id - para eliminar un proyecto con id
    /project - para mostrar todos los proyectos
    /project/:id - para mostrar un proyecto con id

    /project/associate - es para asociar un usuario a un proyecto
    /project/disassociate - es para desasociar un usuario de un proyecto

<h3>Rutas completas</h3>

    http://localhost:3000/api/v1/auth/login

    http://localhost:3000/api/v1/users/create
    http://localhost:3000/api/v1/users/update/1
    http://localhost:3000/api/v1/users
    http://localhost:3000/api/v1/users/delete/1
    http://localhost:3000/api/v1/users/rol/1
    
    http://localhost:3000/api/v1/project/create
    http://localhost:3000/api/v1/project/update/1
    http://localhost:3000/api/v1/project/delete/1
    http://localhost:3000/api/v1/project
    http://localhost:3000/api/v1/project/1
    
    http://localhost:3000/api/v1/project/associate
    http://localhost:3000/api/v1/project/disassociate


<h2>Models</h2>

Yo tuve algunos problemas con las conexiones y por como tenia declarado los models, los models es la escructura de como se mandan los datos a la base de datos.

<h3>user.models.js</h3>

    const Users = sequelize.define('usuarios', {
        id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        nombre: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        email: { 
            type: DataTypes.STRING,
            allowNull: false,
            unique: true 
        },
        password: { 
            type: DataTypes.STRING,
            allowNull: false 
        },
        rol_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'roles', key: 'id' }
        },
        administrador_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'usuarios', key: 'id' }
        }
    }, {
        timestamps: false,
        tableName: 'usuarios'
    });

Este es el modelo que manda a la base de datos id, nombre, email, password, rol_id, administrador_id 

<h3>project.models.js</h3>

    const project = sequelize.define('proyecto',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{
            type:DataTypes.STRING,
            allowNull: false
        },
        descripcion:{
            type:DataTypes.STRING,
            allowNull: false
        },
        fecha_creacion:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        administrador_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            references: {model: User, key:'id'}
        }
    },{
        timestamps: false,
        tableName:'proyectos',
        hooks:{
            afterCreate: (project, option) =>{
                if(project.fecha_creacion){
                    project.fecha_creacion.setHours(project.fecha_creacion.getHours() - 5);
                }
            }
        }
    });

Este es el modelo de los proyectos id, nombre, description, fecha_creacion, administrador_id

<h3>userProject.model.js</h3>

    const UserProject = sequelize.define('UsuariosProyecto', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'usuario_id'
        },
        proyecto_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'proyecto_id'
        }
    }, {
        timestamps: false,
        tableName: 'usuarios_proyectos'
    });

Este manda el modelo usuarios en proyectos con id, usuario_id, proyecto_id

<h2>.Service y .Controller</h2>

Tenemos diferentes archivos llamados .service en services y .controller en controllers.

lo que hace esto es de la siguiente forma:

<h3>user.controller.js</h3>

El controller maneja los endpoint, es el que recibe las solicitudes
y luego llama al service para que realiza la logica y devuelva la
solicitud en un .json

    exports.createUser = async (req, res) =>{
        try{
            const { nombre, email, password, rol_id, administrador_id} = req.body;
            const newUser = await userService.createUser(nombre, email, password, rol_id, administrador_id);
            res.status(201).json({message: 'Usuario creado con exito', user: newUser});
        } catch(err){
            res.status(500).json({message: err.message});
        }
    };


<h3>user.service.js</h3>

El service es el que hace la logica el que accede a la base de datos, realiza la validaciones, ect...

    exports.createUser = async (nombre, email, password, rol_id, administrador_id) => {
        try{
            console.log('Datos recibidos:', { nombre, email, password, rol_id, administrador_id });
            const UserExists = await User.findOne({where : {email}})
            if (UserExists){
                throw new Error('El usuario ya existe');
            }

            //Encrypta la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create ({
                nombre,
                email,
                password: hashedPassword,
                rol_id,
                administrador_id
            });

            //Mensaje de error
            return newUser;
        } catch (err){
            throw new Error(`Error al crear el nuevo usuario: ${err.message}`);
        }
    };