"use strict";
/* eslint-disable */
const Description = use("App/Models/Description");
const Database = use("Database");
const Messages = use("App/Helpers/Message");
const Logger = use("Logger");

class DescriptionController {
  // Lister les lstyles
  async index({ request, response }) {
    const descriptions = await Database.table("descriptions").orderBy(
      "id",
      "desc"
    );

    if (Object.keys(descriptions).length === 0) {
      Logger.error("%s - %s", request.method(), request.url());
      return response.json({ message: Messages.post.okNothing });
    }

    Logger.info("%s - %s", request.method(), request.url());
    return descriptions;
  }

  // Obtenir un style
  async fetchOne({ params, request, response }) {
    const description = await Database.table("descriptions").where(
      "music-style",
      params.id
    );

    if (!description) {
      Logger.error("%s - %s", request.method(), request.url());
      return response
        .status(404)
        .json({ message: Messages.post.errorNotFound });
    }

    Logger.info("%s - %s", request.method(), request.url());
    return description;
  }
}

module.exports = DescriptionController;
