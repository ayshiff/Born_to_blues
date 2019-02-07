"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Song extends Model {
  // artist() {
  //   return this.belongsTo("App/Models/Artist");
  // }
  // influence() {
  //   return this.belongsTo("App/Models/Influence");
  // }
}

module.exports = Song;
