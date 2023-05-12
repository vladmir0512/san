const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
const csrf = require('csurf');
const { Client } = require('../models');
const { Sancard } = require('../models');
const { Room } = require('../models');
const { Travel } = require('../models');
const { Reservation } = require('../models');
const { Type_service } = require('../models');
const { Service } = require('../models');
const { Doctor } = require('../models');



const csrfMiddleware = csrf({ cookie: true });
const {
  signup,
  signin
} = require("../controllers/index")



// async..await is not allowed in global scope, must use a wrapper
async function main(email, text, service_email) {
  //email='santer.grushko063@yandex.ru'
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  if (service_email === 1){
    service_email = "vjgamer2001.h2dao4@zapiermail.com"
  }
  if (service_email === 2){
    service_email = "test.h2dao4@zapiermail.com"
  }
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "vjgamer2001",
      pass: "hwlqdrrpnehnctrr"
    },
  });
  console.log(text)
  console.log(email)
  // create reusable transporter object using the default SMTP transport

  const mailOptions = {
    from: '"Санаторий Мечта" <vjgamer2001@gmail.com>', // sender address
    to: service_email,//email, // list of receivers
    subject: "Hello ✔", // Subject line
    html: `${text};${email}`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  console.log("Message sent: %s", mailOptions.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mailOptions));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  transporter.close()
}

main().catch(console.error);



// const isEmailUnique = email =>
//   Client.findOne({ where: { email} })
//     .then(token => token !== null)
//     .then(isUnique => isUnique);
router.use(csrf({ cookie: true }));

router.use(function (req, res, next) {
  res.locals._csrf = req.csrfToken();
  next();
});
router.get('/', async function (req, res) {
  var email = req.cookies.google_email;

  if (email == undefined) {
    email = "Не найдено email в cookie."
  }
  const [client, created] = await Client.findOrCreate({ where: { email: email } })
  const [sancard, createdd] = await Sancard.findOrCreate({ where: { ClientId: client.id }, defaults: { name: "", number: "", sex: 0, procedures: "", diagnosis: "", address: "" } })

  res.render('index', { title: 'Express' });
});
router.get('/about', async function (req, res) {
  var email = req.cookies.google_email;

  if (email == undefined) {
    email = "Не найдено email в cookie."
  }
  console.log(email)
  const [client, created] = await Client.findOrCreate({ where: { email: email } })
  const [sancard, createdd] = await Sancard.findOrCreate({ where: { ClientId: client.id }, defaults: { name: "", number: "", sex: 0, procedures: "", diagnosis: "", address: "" } })

  res.render('about', { title: 'Express' })
})
router.get('/profile', async function (req, res) {

  //main('vjgamer2001@gmail.com', 'Еременко Владимир Александрович;11/05/2023;Грязевые ванны;1;5000,54',2)

  try {
    var google_email = req.cookies.google_email;

    if (google_email == undefined) {
      google_email = "Не найдено email в cookie."
    }

    const [clientt, created] = await Client.findOrCreate({ where: { email: google_email } })
    const [sancardd, createdd] = await Sancard.findOrCreate({ where: { ClientId: clientt.id }, defaults: { name: "", number: "", sex: 0, procedures: "", diagnosis: "", address: "" } })


    const client = await Client.findOne({ where: { email: google_email } })
    const sancard = await Sancard.findOne({ where: { ClientId: client.id } })
    const reservations = await Reservation.findAll({ where: { isPaid: 0 } })
    const services = await Service.findAll({ where: { isPaid: 0 } })
    const type_services = await Type_service.findAll();
    const rooms = await Room.findAll();
    const travels = await Travel.findAll();
    res.render('profile', { csrfToken: req.csrfToken(), sancard, reservations, services, type_services, rooms, travels, clientt });

  } catch (error) {
    console.error(error);
  }


});

router.post('/api/submit-sancard', async (req, res) => {
  const { name, sanitary_card, gender, diagnosis, procedures, address } = req.body;

  console.log(name);
  try {
    var email = req.cookies.google_email;

    if (email == undefined) {
      email = "Не найдено email в cookie."
    }
    if (gender == 'male') {
      var sex = 0;
    } else if (gender == 'female') {
      var sex = 1;
    }
    const client = await Client.findOne({ where: { email: email } })
    const [sancard, created] = Sancard.findOrCreate({ where: { ClientId: client.id }, defaults: { name: name, number: sanitary_card, sex: sex, diagnosis: diagnosis, procedures: procedures, address: address } })
      .then(success => {
        console.log(success);
        res.redirect('/profile')
        Sancard.update({ number: sanitary_card, sex: sex, diagnosis: diagnosis, procedures: procedures, address: address }, { where: { ClientId: client.id } })
        Client.update({ name: name }, { where: { id: client.id } });
      })
      .then(error => {
        console.log(error);
      })


  } catch (error) {
    console.error(error);
  }






})

router.post('/api/submit-reservation', async (req, res) => {
  const { surname, name, patronymic, email, phone, package, room_category, adults, children, check_in_date, check_out_date } = req.body;

  console.log(req.body)
  console.log(surname)
  console.log(name)
  console.log(patronymic)

  var RoomId = 1;
  var TravelId = 1;
  if (room_category == 'Стандарт') {
    RoomId = 2700
  } else if (room_category == 'Полулюкс') {
    RoomId = 3500
  } else if (room_category == 'Люкс') {
    RoomId = 4200
  }
  if (package == 'Базовая') {
    TravelId = 300
  } else if (package == 'Оздоровительная') {
    TravelId = 400
  } else if (package == 'Элитная') {
    TravelId = 500
  }
  var fullname = `${surname} ${name} ${patronymic}`;

  function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

  function parseDate(str) {
    var mdy = str.split('-');
    return new Date(mdy[1], mdy[0] - 1, mdy[2],);
  }

  var delta = datediff(parseDate(check_in_date), parseDate(check_out_date));
  if (delta < 0) {
    delta = (delta * (-1));
  }
  if (delta === 0) {
    delta = 1;
  }

  if (children < 0) {
    children = children * (-1);
  }
  if (adults < 0) {
    adults = adults * (-1);
  }

  const fullcost = 5000 +
    (RoomId * delta) +
    (TravelId * delta) +
    (adults * TravelId * delta) +
    (children * TravelId * delta * 0.5);
  console.log(fullname)




  try {
    var google_email = req.cookies.google_email;

    if (google_email == undefined) {
      google_email = "Не найдено email в cookie."
    }
    console.log(email);

    const client = await Client.findOne({ where: { email: google_email } })

    const [reservation, created] = Reservation.create({ ClientId: client.id, RoomId: RoomId, TravelId: TravelId, name: fullname, email: email, phone: phone, number_adult: adults, number_children: children, date_arrival: check_in_date, date_departure: check_out_date, full_cost: fullcost, isPaid: 0 })
      .then(success => {
        res.redirect('/profile')


      })
      .then(error => {
        console.log(error);
      })
  } catch (error) {
    console.error(error);
  }
});

router.post('/api/submit-services', async (req, res) => {
  console.log(req.body);
  const { surname, name, patronymic, email, services, number_services, date, phone } = req.body;

  try {
    var google_email = req.cookies.google_email;

    if (google_email == undefined) {
      google_email = "Не найдено email в cookie."
    }

    console.log(services);
    const fullname = `${surname} ${name} ${patronymic}`
    const client = await Client.findOne({ where: { email: google_email } })
    const type_service = await Type_service.findOne({ where: { id: parseInt(services) } });
    //Формула такая
    console.log(number_services)
    function parseDate(str) {
      var mdy = str.split('-');
      return new Date(mdy[2], mdy[0] - 1, mdy[1]);
    }
    const cost = type_service.cost
    const num = number_services
    console.log(`cost =${cost}, type ${typeof (cost)}`)
    console.log(`num =${num}, type ${typeof (num)}`)

    var fullcost = ((type_service.cost) * (parseInt(number_services)));
    console.log(fullcost)
    console.log(typeof (fullcost))
    const [service, created] = Service.create({ ClientId: client.id, name: fullname, TypeServiceId: type_service.id, email: email, number_services: number_services, date: date, phone: phone, full_cost: fullcost, isPaid: 0 })
      .then(success => {
        res.redirect('/profile')


      })
      .then(error => {
        console.log(error);
      })
  } catch (error) {
    console.error(error);
  }


});

router.post('/api/pay-reservation', async (req, res) => {
  console.log(req.body)
  var { id, text } = req.body;
  var words = id.split('_')
  id = words[words.length - 1];
  console.log(id)
  id = parseInt(id)
  var google_email = req.cookies.google_email;

  const reservation = await Reservation.findOne({ where: { id: id } })

  const client = await Client.findOne({ where: { email: google_email } })
  const email = reservation.email
  console.log(`email!!!${email}`)
  const travel = await Travel.findOne({ where: { id: reservation.TravelId } })
  const room = await Room.findOne({ where: { id: reservation.RoomId } })

  var travname = travel.name
  var roomname = room.name
  const textt = `${client.name};${reservation.date_arrival};${reservation.number_adult};${reservation.number_children};${roomname};${travname};${reservation.full_cost}`
    
  main(email, textt, 1)
  //await Reservation.update({isPaid: 1}, {where: {id: id} })
  try {
    await Reservation.update({ isPaid: 1 }, { where: { id: id } })
      .then(success => {
        console.log(success);
        res.redirect('/profile')
      })
      .then(error => {
        console.log(error);
      })
  }
  catch (error) {
    console.error(error);
  }
});



router.post('/api/pay-service', async (req, res) => {
  console.log(req.body)
  var { id, text } = req.body;
  var words = id.split('_')
  id = words[words.length - 1];
  console.log(id)
  id = parseInt(id)
  const service = await Service.findOne({ where: { id: id } })
  const email = service.email
  const typeService = await Type_service.findOne({ where: { id: service.TypeServiceId } })
  const textt = ` ${service.name};${service.date};${typeService.name}; ${service.number_services};${service.full_cost}`
  main(email, textt, 2)
  //await Reservation.update({isPaid: 1}, {where: {id: id} })
  try {
    await Service.update({ isPaid: 1 }, { where: { id: id } })
      .then(success => {
        console.log(success);
        res.redirect('/profile')
      })
      .then(error => {
        console.log(error);
      })
  }
  catch (error) {
    console.error(error);
  }
});

router.get('/doctors', async function (req, res) {
  var google_email = req.cookies.google_email;

  if (google_email == undefined) {
    google_email = "Не найдено email в cookie."
  }

  const [clientt, created] = await Client.findOrCreate({ where: { email: google_email } })
  const [sancardd, createdd] = await Sancard.findOrCreate({ where: { ClientId: clientt.id }, defaults: { name: "", number: "", sex: 0, procedures: "", diagnosis: "", address: "" } })

  const doctors = await Doctor.findAll();
  res.render('doctors', { title: 'Express', doctors })
})
router.get('/food', async function (req, res) {
  var google_email = req.cookies.google_email;

  if (google_email == undefined) {
    google_email = "Не найдено email в cookie."
  }

  const [clientt, created] = await Client.findOrCreate({ where: { email: google_email } })
  const [sancardd, createdd] = await Sancard.findOrCreate({ where: { ClientId: clientt.id }, defaults: { name: "", number: "", sex: 0, procedures: "", diagnosis: "", address: "" } })

  res.render('food', { title: 'Express' })
})
router.get('/medicine', async function (req, res) {
  var google_email = req.cookies.google_email;

  if (google_email == undefined) {
    google_email = "Не найдено email в cookie."
  }

  const [clientt, created] = await Client.findOrCreate({ where: { email: google_email } })
  const [sancardd, createdd] = await Sancard.findOrCreate({ where: { ClientId: clientt.id }, defaults: { name: "", number: "", sex: 0, procedures: "", diagnosis: "", address: "" } })
  const doctors = await Doctor.findAll();
  var type_services = await Type_service.findAll();
  res.render('medicine', { title: 'Express', type_services, doctors })
})
router.get('/reservation', async function (req, res) {
  var google_email = req.cookies.google_email;

  if (google_email == undefined) {
    google_email = "Не найдено email в cookie."
  }

  const [clientt, created] = await Client.findOrCreate({ where: { email: google_email } })
  const [sancardd, createdd] = await Sancard.findOrCreate({ where: { ClientId: clientt.id }, defaults: { name: "", number: "", sex: 0, procedures: "", diagnosis: "", address: "" } })


  const rooms = await Room.findAll();
  const travel = await Travel.findAll();
  res.render('reservation', { csrfToken: req.csrfToken(), rooms, travel })
})
router.get('/rooms', async function (req, res) {
  var google_email = req.cookies.google_email;

  if (google_email == undefined) {
    google_email = "Не найдено email в cookie."
  }

  const [clientt, created] = await Client.findOrCreate({ where: { email: google_email } })
  const [sancardd, createdd] = await Sancard.findOrCreate({ where: { ClientId: clientt.id }, defaults: { name: "", number: "", sex: 0, procedures: "", diagnosis: "", address: "" } })

  const rooms = await Room.findAll();
  res.render('rooms', { title: 'Express', rooms })
})
router.get('/admin', async function (req, res) {

  res.render('admin', { title: 'Express', admin })
})
router.get('/travel', async function (req, res) {
  var google_email = req.cookies.google_email;

  if (google_email == undefined) {
    google_email = "Не найдено email в cookie."
  }

  const [clientt, created] = await Client.findOrCreate({ where: { email: google_email } })
  const [sancardd, createdd] = await Sancard.findOrCreate({ where: { ClientId: clientt.id }, defaults: { name: "", number: "", sex: 0, procedures: "", diagnosis: "", address: "" } })

  const travel = await Travel.findAll();
  res.render('travel', { title: 'Express', travel })
})
router.get('/med_vaucher', async function (req, res) {
  var google_email = req.cookies.google_email;

  if (google_email == undefined) {
    google_email = "Не найдено email в cookie."
  }

  const [clientt, created] = await Client.findOrCreate({ where: { email: google_email } })
  const [sancardd, createdd] = await Sancard.findOrCreate({ where: { ClientId: clientt.id }, defaults: { name: "", number: "", sex: 0, procedures: "", diagnosis: "", address: "" } })

  const type_services = await Type_service.findAll();
  res.render('med_vaucher', { csrfToken: req.csrfToken(), type_services })
})

router.use(csrf({ cookie: true }));
router.use(function (req, res, next) {
  res.locals._csrf = req.csrfToken();
  next();
});
//router.use(csrfMiddleware);
module.exports = router;
