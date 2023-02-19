const express = require('express');
const app = express();
const mysql2 = require('mysql2');
const hbs = require (`hbs`);
const nodemailer = require (`nodemailer`);
const { Console } = require("console");
const path = require (`path`);
const { application } = require("express");
require(`dotenv`).config();

//configuramos el puerto
const PORT = process.env.PORT || 9000;

console.log({PORT})
//Midelware. esto hace que la aplicacion entienda y se comunique con los comandos
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,`public`)));


  app.set(`view engine`,`hbs`);


  


  app.set(`views`, path.join(__dirname,`views`));
  
  //configuracion los partial de los motores de las plantillas
  
  hbs.registerPartials(path.join(__dirname,`views/partials`)); 

//conexion de la base de datos
  const conexion = mysql2.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DBPORT
    
  })
  
  
  conexion.connect((error) => {
  
    if(error){
      console.log(`el error: ${error}`);
    }else{ 
      console.log(`conectado correctamente a la base de datos`); 
  }
  }); 


  //rutas de la app
 
  app.get('/', (req, res) => {
    res.render('index', {
        titulo: 'Home'
    })
})

   app.get('/contacto', (req, res) => {
   res.render('contacto', {
   titulo: 'contacto'
   })
})

   app.get('/youtube', (req, res) => {
   res.render('youtube', {
   titulo: 'youtube'
   })
})





//creación de post de datos de clientes y envio de email
  app.post('/contacto', (req, res) => {
      const nombre = req.body.nombre;
      const apellido = req.body.apellido;
      const telefono = req.body.telefono;
      const email = req.body.email;
      const mensaje = req.body.mensaje;
  
  
       //creamos una funcion para enviar Email al cliente
      async function envioMail(){
        //configuramos la cuenta del envio
      let transporter = nodemailer.createTransport({
              host: 'smtp.gmail.com',
              port: 465,
              secure: true,
              auth: {
                  user: process.env.EMAIL,
                  pass: process.env.EMAILPASSWORD
                },
                tls: {rejectUnauthorized: false}
              });
              
              
                            
            
           //Envio del mail    
        let info = await transporter.sendMail({
          from: process.env.EMAIL,
          to: `${email}`,
          cc:`juanma26@gmail.com`,
          subject: "Gracias por contactarme!!!",
          html:`Muchas gracias por visitar mi página <br>
          Me pondre en contacto con vos , lo antes posible ...Saludos!!! <br>`
          })
      }
  
      let datos = {
          nombre: nombre,
          apellido: apellido,
          telefono: telefono,
          email: email,
          mensaje : mensaje
      }
  
      let sql = "INSERT INTO contactos set ?";
  
      conexion.query(sql, datos, function(err){
          if(err) throw err;
              console.log(`Se ha registrado un ingreso de datos`);
          //Email
              envioMail().catch(console.error);
              res.render('enviado')
          })
  
  })
  //servidor a la escucha de las peticiones


  app.listen(PORT,() => {
    console.log(`Servidor conectado en el puerto : ${PORT}`)
  })








 







