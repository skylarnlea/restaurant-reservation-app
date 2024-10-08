const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

const complete_fields = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
]

//function to ensure certain time conditions are met prior to helper functions
function validateTime(string) {
  const [hour, minute] = string.split(":");

  if (hour.length > 2 || minute.length > 2) {
    return false;
  }

  if (hour < 1 || hour > 23) {
    return false;
  }

  if (minute < 0 || minute > 59) {
    return false;
  }
  return true;
}

//function to ensure fiels and conditions are met prior to CRUD operations
function validReservation(req, res, next) {
const reservation = req.body.data;

if (!reservation) {
  return next({ status: 400, message: `Must have data property.` });
}

complete_fields.forEach((input) => {
  if(!reservation[input]) {
    return next ({ status: 400, message: `${input} field required` });
  }
  
  if(input === "people" && typeof reservation[input] !== "number") {
    return next({ status: 400, message: `${reservation[input]} is not a number type for people field.` });
  }

  if(input === "reservation_date" && ~Date.parse(reservation[input])) {
    return next({ status: 400, message: `${input} is not a valid date.` });
  }

  if(input === "reservation_time") {
    if(!validateTime(reservation[input])) {
      return next({ status: 400, message: `${input} is not a valid time.` });
    }
  }
});
next();
}

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const { date, mobile_number } = req.query;
  let reservations;
  if (mobile_number) {
    reservations = await service.search(mobile_number);
  } else {
    reservations = date ? await service.listByDay(date) : await service.list();
  }
  res.json({
    data: reservations,
  });
}

/**
 * Create handler
 */
async function create(rew, res) {
  const reservation = req.body.data;
  const { reservation_id } = await service.create(reservation);
  reservation.reservation_id = reservation_id;
  res.status(201).json({ data: reservation });
}


module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    asyncErrorBoundary(create),
    validateTime,
    validReservation,
  ]
};
