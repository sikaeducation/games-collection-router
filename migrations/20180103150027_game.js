exports.up = function(knex, Promise) {
    return knex.schema.createTable("game", game => {
        game.increments();
        game.string("name");
        game.string("developer");
        game.float("rating");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("game");
};
