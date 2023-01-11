const express = require('express');
const mysql = require('mysql');
const mysql2 = require('mysql2');
const app = express();
const hbs = require (`hbs`);
const path = require (`path`);
const nodemailer = require (`nodemailer`);
const { application } = require("express");
require(`dotenv`).config();


const PORT = process.env.PORT || 9000;

console.log({PORT})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,`public`)));



app.listen(PORT,() => {
    console.log(`Servidor conectado en el puerto : ${PORT}`)
  })

  app.set(`view engine`,`hbs`);



  app.set(`views`, path.join(__dirname,`views`));
  
  
  
  hbs.registerPartials(path.join(__dirname,`views/partials`)); 









  
 
  app.get('/', (req, res) => {
    res.render('index', {
        titulo: 'Home'
    })
})

   app.get('/contacto', (req, res) => {
   res.render('contacto', {
   titulo: 'Contacto'
   })
})

   app.get('/youtube', (req, res) => {
   res.render('youtube', {
   titulo: 'Youtube'
   })
})






  app.post('/contacto', (req, res) =>{
    const nombre = req.body.nombre;
      const apellido = req.body.apellido;
      const telefono = req.body.telefono;
      const email = req.body.email;
      const mensaje = req.body.mensaje;
  
  
      
      async function envioMail(){
          //Configuramos la cuenta del envío
          let transporter = nodemailer.createTransport({
              host: 'smtp.gmail.com',
              port: 465,
              secure: true,
              auth: {
                  user: process.env.EMAIL,
                  pass: process.env.EMAILPASSWORD
              }
         
          });
  
         
          let info = await transporter.sendMail({
              from: process.env.EMAIL,
              to: `${email}`,
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
          if (err) throw err;
              console.log(`Se ha registrado un ingreso de datos`);
              //Email
              envioMail().catch(console.error);
              res.render('enviado')
          })
  
  })
  






 



const conexion = mysql2.createConnection({
  host:process.env.HOST,
  user:process.env.USER,
  password:process.env.PASSWORD,
  database:process.env.DATABASE,
  port:process.env.DBPORT
  
});


conexion.connect((error) => {

  if(error){
    console.log(`el error: ${error}`);
  }else{ 
    console.log(`conectado correctamente a la base de datos`); 
}
}); 




