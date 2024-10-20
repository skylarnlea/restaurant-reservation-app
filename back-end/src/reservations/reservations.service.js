const knex = require("../db/connection");

function list() {
    return knex("reservations")
        .select("*")
        .whereNotIn("status", ["finished", "cancelled"])
        .orderBy("reservation_date");
}

function create(reservation) {
    return knex("Reservations as r")
        .insert(reservation)
        .returning("*")
        .then((newReservation) => newReservation[0]);
}

function listByDay(date) {
    return knex("reservations")
        .select("*")
        .where({ reservation_date: date })
        .whereNot("status", "finished")
        .orderBy("reservation_time");
}

function read(reservation_id) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .first()
}

module.exports = {
    list,
    create,
    listByDay,
    read,
}