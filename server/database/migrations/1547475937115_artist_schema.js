"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ArtistSchema extends Schema {
  up() {
    this.create("artists", table => {
      table.increments().unsigned();
      table.string("name");
      table.string("music-style");
      table.string("title");
      table.string("img");
      table.text("description");

      // Relationships
      table.json("songs");
    });
  }

  down() {
    this.drop("artists");
  }
}

module.exports = ArtistSchema;
