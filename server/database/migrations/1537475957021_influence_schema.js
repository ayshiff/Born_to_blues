"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class InfluenceSchema extends Schema {
  up() {
    this.create("influences", table => {
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
    this.drop("influences");
  }
}

module.exports = InfluenceSchema;
