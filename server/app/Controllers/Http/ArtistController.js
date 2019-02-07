"use strict";
/* eslint-disable */
const Artist = use("App/Models/Artist");
const Database = use("Database");
const Messages = use("App/Helpers/Message");
const Logger = use("Logger");

class ArtistController {
  // Lister les lstyles
  async index({ request, response }) {
    const artists = await Database.table("artists").orderBy("id", "desc");

    if (Object.keys(artists).length === 0) {
      Logger.error("%s - %s", request.method(), request.url());
      return response.json({ message: Messages.post.okNothing });
    }

    Logger.info("%s - %s", request.method(), request.url());
    return artists;
  }

  // Obtenir un style
  async fetchOne({ params, request, response }) {
    const artist = await Database.table("artists").where(
      "music-style",
      params.id
    );

    if (!artist) {
      Logger.error("%s - %s", request.method(), request.url());
      return response
        .status(404)
        .json({ message: Messages.post.errorNotFound });
    }

    Logger.info("%s - %s", request.method(), request.url());
    return artist;
  }
}

module.exports = ArtistController;
