"use strict";
/* eslint-disable */
const Influence = use("App/Models/Influence");
const Database = use("Database");
const Messages = use("App/Helpers/Message");
const Logger = use("Logger");

class InfluenceController {
  // Lister les lstyles
  async index({ request, response }) {
    const influences = await Database.table("influences").orderBy("id", "desc");

    if (Object.keys(influences).length === 0) {
      Logger.error("%s - %s", request.method(), request.url());
      return response.json({ message: Messages.post.okNothing });
    }

    Logger.info("%s - %s", request.method(), request.url());
    return influences;
  }

  // Obtenir un style
  async fetchOne({ params, request, response }) {
    const influence = await Database.table("influences").where(
      "music-style",
      params.id
    );

    if (!influence) {
      Logger.error("%s - %s", request.method(), request.url());
      return response
        .status(404)
        .json({ message: Messages.post.errorNotFound });
    }

    Logger.info("%s - %s", request.method(), request.url());
    return influence;
  }
}

module.exports = InfluenceController;
