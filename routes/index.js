const
    express   = require('express'),
    router    = express.Router(),
    request   = require('request'),
    ipapi     = require('ipapi.co'),
    city      = require('../ciudades/city');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Test de Desarrollo Backend' });
});

/*-------------------------------------------------------
  Nombre de Api: location
  Descripcion:
  APi para ubicar la localizacion actual por ip realiza
  peticion a ip-api para obtener ubicacion.
  Retorna:
    ubicacion actual en formato JSON
-------------------------------------------------------*/
router.get('/location',(req,res)=>{
  let ruta = 'http://ip-api.com/json';
  request(ruta, (error,response,body)=>{
    if(response.statusCode == 200){
      res.status(200).send(body)
    }else {
      res.status(400).send({message:"No se puede encontrar una region"})
    }
  })
})

/*-------------------------------------------------------
  Nombre de Api: current
  Descripcion:
  APi para obtener informacion del tiempo actual de la
  ciudad ubicada por ip-APi
  Retorna:
    pronostico del tiempo actual JSON
-------------------------------------------------------*/

router.get('/current', (req,res)=>{
  request('http://localhost:3000/location',(error,response,body)=>{
    if (response.statusCode == 200) {
      let city = JSON.parse(body),
            ruta = `http://api.openweathermap.org/data/2.5/weather?q=${city.city},${city.countryCode}&APPID=63c1a7a57e940d8c86cbf1a0618b2140`;
            request(ruta, (error,response,body)=>{
              res.status(200).send(body);
            })
    }else {
      res.status(400).send({message:"No se puede encontrar una region"})
    }
  })
})

/*-------------------------------------------------------
  Nombre de Api: forecast
  Descripcion:
  APi para obtener informacion del tiempo en los proximos
  5 dias de la ciudad ubicada por ip-APi
  Retorna:
    pronostico del tiempo en los proximos 5 dias JSOM
-------------------------------------------------------*/

router.get('/forecast', (req,res)=>{
  request('http://localhost:3000/location',(err,response,body)=>{
    if (response.statusCode == 200) {
      let city = JSON.parse(body),
            ruta = `http://api.openweathermap.org/data/2.5/forecast?q=${city.city},${city.countryCode}&APPID=63c1a7a57e940d8c86cbf1a0618b2140`;
            request(ruta, (error,response,body)=>{
              res.status(200).send(body);
            })
    }else {
      res.status(400).send({message:"No se puede encontrar una region"})
    }
  })
})

module.exports = router;
