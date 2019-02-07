const Factory = use("Factory");

class DatabaseSeeder {
  *run() {
    yield Factory.model("App/Model/Description").create(5);
    yield Factory.model("App/Model/Influence").create(5);
    yield Factory.model("App/Model/Song").create(5);
    yield Factory.model("App/Model/Artist").create(5);
    yield Factory.model("App/Model/MusicStyle").create(5);
  }
}

module.exports = DatabaseSeeder;
