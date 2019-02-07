"use strict";
/* eslint-disable */
const Song = use("App/Models/Song");
const Database = use("Database");
const Messages = use("App/Helpers/Message");
const Logger = use("Logger");

class SongController {
  // Lister les lstyles
  async index({ request, response }) {
    const song = await Database.table("songs").orderBy("id", "desc");

    if (Object.keys(song).length === 0) {
      Logger.error("%s - %s", request.method(), request.url());
      return response.json({ message: Messages.post.okNothing });
    }

    Logger.info("%s - %s", request.method(), request.url());
    return song;
  }

  // Obtenir un style
  async fetchOne({ params, request, response }) {
    const song = await Database.table("songs").where("music-style", params.id);

    if (!song) {
      Logger.error("%s - %s", request.method(), request.url());
      return response
        .status(404)
        .json({ message: Messages.post.errorNotFound });
    }

    Logger.info("%s - %s", request.method(), request.url());
    return song;
  }
}

module.exports = SongController;
