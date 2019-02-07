"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Artist extends Model {
  // song() {
  //   return this.hasMany("App/Models/Song");
  // }
}

module.exports = Artist;
