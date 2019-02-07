"use strict";
/* eslint-disable */
const Anecdote = use("App/Models/Anecdote");
const Database = use("Database");
const Messages = use("App/Helpers/Message");
const Logger = use("Logger");

class AnecdoteController {
  // Lister les lstyles
  async index({ request, response }) {
    const anecdotes = await Database.table("anecdotes").orderBy("id", "desc");

    if (Object.keys(anecdotes).length === 0) {
      Logger.error("%s - %s", request.method(), request.url());
      return response.json({ message: Messages.post.okNothing });
    }

    Logger.info("%s - %s", request.method(), request.url());
    return anecdotes;
  }

  // Obtenir un style
  async fetchOne({ params, request, response }) {
    const anecdote = await Database.table("anecdotes").where(
      "music-style",
      params.id
    );

    if (!anecdote) {
      Logger.error("%s - %s", request.method(), request.url());
      return response
        .status(404)
        .json({ message: Messages.post.errorNotFound });
    }

    Logger.info("%s - %s", request.method(), request.url());
    return anecdote;
  }
}

module.exports = AnecdoteController;
