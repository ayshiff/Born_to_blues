"use strict";
/* eslint-disable */
const Impact = use("App/Models/Impact");
const Database = use("Database");
const Messages = use("App/Helpers/Message");
const Logger = use("Logger");

class ImpactController {
  // Lister les lstyles
  async index({ request, response }) {
    const impacts = await Database.table("impacts").orderBy("id", "desc");
    if (Object.keys(impacts).length === 0) {
      Logger.error("%s - %s", request.method(), request.url());
      return response.json({ message: Messages.post.okNothing });
    }

    Logger.info("%s - %s", request.method(), request.url());
    return impacts;
  }

  // async fetchOrigine({ request, response }) {
  //   await Database.table('impacts').where(
  //     "music-style",
  //     params.id
  //   );
  // }

  // Obtenir un style
  async fetchOne({ params, request, response }) {
    const impact = await Database.table("impacts").where(
      "music-style",
      params.id
    );

    if (!impact) {
      Logger.error("%s - %s", request.method(), request.url());
      return response
        .status(404)
        .json({ message: Messages.post.errorNotFound });
    }

    Logger.info("%s - %s", request.method(), request.url());
    return impact;
  }
}

module.exports = ImpactController;
