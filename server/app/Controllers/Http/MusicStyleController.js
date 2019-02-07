"use strict";
/* eslint-disable */
const MusicStyle = use("App/Models/MusicStyle");
const Database = use("Database");
const Messages = use("App/Helpers/Message");
const Logger = use("Logger");

class MusicStyleController {
  // Add style
  async create({ request, response }) {
    const body = request.only(["name", "email", "title", "tel"]);

    if (body.title && body.name && body.email && body.tel) {
      const newPost = new MusicStyle();
      newPost.title = body.title;
      newPost.name = body.name;
      newPost.email = body.email;
      newPost.tel = body.tel;
      await newPost.save();

      Logger.info("%s - %s", request.method(), request.url());
      return response.status(201).json(newPost);
    }

    Logger.error("%s - %s", request.method(), request.url());
    return response
      .status(400)
      .json({ message: Messages.post.errorBadRequest });
  }

  // List music styles
  async index({ request, response }) {
    const musicStyles = await Database.table("music_styles").orderBy(
      "id",
      "desc"
    );

    if (Object.keys(musicStyles).length === 0) {
      Logger.error("%s - %s", request.method(), request.url());
      return response.json({ message: Messages.post.okNothing });
    }

    Logger.info("%s - %s", request.method(), request.url());
    return musicStyles;
  }

  // Obtenir un style
  async fetchOne({ params, request, response }) {
    const musicStyle = await Database.table("music_styles").where(
      "name",
      params.id
    );

    if (!musicStyle) {
      Logger.error("%s - %s", request.method(), request.url());
      return response
        .status(404)
        .json({ message: Messages.post.errorNotFound });
    }

    Logger.info("%s - %s", request.method(), request.url());
    return musicStyle;
  }

  // Modifier un style
  async update({ params, request, response }) {}

  // Supprimer un style
  async delete({ params, request, response }) {}
}

module.exports = MusicStyleController;
