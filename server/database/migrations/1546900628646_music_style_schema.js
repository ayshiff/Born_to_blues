"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class MusicStyleSchema extends Schema {
  up() {
    this.create("music_styles", table => {
      table.increments().unsigned();
      table.string("name");
      table.string("img");
      table.text("anecdote");
      table.text("origin");
      table.text("theme");
      table
        .integer("related_description_id", 11)
        .unsigned()
        .references("id")
        .inTable("descriptions");
      table
        .integer("related_influence_id", 11)
        .unsigned()
        .references("id")
        .inTable("influences");
    });
  }

  down() {
    this.drop("music_styles");
  }
}

module.exports = MusicStyleSchema;
