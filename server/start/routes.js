"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.group(() => {
  /** Routing Music Style */

  Route.get("music-style/:id", "MusicStyleController.fetchOne");
  Route.get("music-style", "MusicStyleController.index");
  // Route.post("music-style", "MusicStyleController.create");
  // Route.put("music-style/:id", "MusicStyleController.update");
  // Route.delete("music-style/:id", "MusicStyleController.delete");

  /** Routing Artist */

  Route.get("artists/:id", "ArtistController.fetchOne");
  Route.get("artists", "ArtistController.index");

  /** Routing Song */

  Route.get("source/:id", "SongController.fetchOne");
  Route.get("source", "SongController.index");

  /** Routing Influence */

  Route.get("influence/:id", "AnecdoteController.fetchOne");
  Route.get("influence", "AnecdoteController.index");

  Route.get("origin/:id", "InfluenceController.fetchOne");
  Route.get("origin", "InfluenceController.index");

  Route.get("links/:id", "InfluenceController.fetchOne");
  Route.get("links", "InfluenceController.index");

  /** Routing Description */

  Route.get("description/:id", "DescriptionController.fetchOne");
  Route.get("description", "DescriptionController.index");

  /** Routing Song */
  Route.get("song/:id", "SongController.fetchOne");
  Route.get("song", "SongController.index");

  /** Routing Anecdote */
  Route.get("anecdotes/:id", "AnecdoteController.fetchOne");
  Route.get("anecdotes", "AnecdoteController.index");

  /** Routing Impact */
  Route.get("impact", "ImpactController.index");
  Route.get("impact/:id", "ImpactController.fetchOne");
}).prefix("api");
