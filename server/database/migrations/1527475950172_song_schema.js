"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SongSchema extends Schema {
  up() {
    this.create("songs", table => {
      table.increments().unsigned();
      table.string("name");
      table.string("music-style");
      table.string("author");
      table.string("src");
      table.string("img");
    });
  }

  down() {
    this.drop("songs");
  }
}

module.exports = SongSchema;
