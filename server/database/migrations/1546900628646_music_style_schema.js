"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class MusicStyleSchema extends Schema {
  up() {
    this.create("music_styles", table => {
      table.increments().unsigned();
      table.string("name");
      table.string("img");
      table.text("origin");
      table.text("pitch");
      table.string("color");

      // Relationships
      table.json("descriptions");
      table.json("influences");
      table.json("anecdotes");
      table.json("themes");
      table.json("artists");
      table.json("impacts");
    });
  }

  down() {
    this.drop("music_styles");
  }
}

module.exports = MusicStyleSchema;
