"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AnecdoteSchema extends Schema {
  up() {
    this.create("anecdotes", table => {
      table.increments();
      table.string("name");
      table.string("music-style");
      table.text("description");

      // Relationships
      table.json("songs");
    });
  }

  down() {
    this.drop("anecdotes");
  }
}

module.exports = AnecdoteSchema;
