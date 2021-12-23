import { DataTypes } from "sequelize";

import { sequelize } from "../db";

const Users = sequelize.define('users', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' }
});

const Baskets = sequelize.define('baskets', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

const BasketsGames = sequelize.define('baskets_games', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Games = sequelize.define('games', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false }
});

const Genres = sequelize.define('genres', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

const Publishers = sequelize.define('publishers', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

const Rating = sequelize.define('rating', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.INTEGER, allowNull: false }
});

const GameInfo = sequelize.define('game_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false }
});

const GamesGenres = sequelize.define('games_genres', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const GenresPublishers = sequelize.define('genres_publishers', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

Users.hasOne(Baskets);
Baskets.belongsTo(Users);

Users.hasMany(Rating);
Rating.belongsTo(Users);

Baskets.hasMany(BasketsGames);
BasketsGames.belongsTo(Baskets);

Publishers.hasMany(Games);
Games.belongsTo(Publishers);

Games.hasMany(Rating);
Rating.belongsTo(Games);

Games.hasMany(BasketsGames);
BasketsGames.belongsTo(Games);

Games.hasMany(GameInfo);
GameInfo.belongsTo(Games);

Genres.belongsToMany(Games, { through: GamesGenres });
Games.belongsToMany(Genres, { through: GamesGenres });

Genres.belongsToMany(Publishers, { through: GenresPublishers });
Publishers.belongsToMany(Genres, { through: GenresPublishers });

export const db = {
  sequelize,
  Users,
  Baskets,
  BasketsGames,
  Games,
  Genres,
  Publishers,
  Rating,
  GameInfo,
  GamesGenres,
  GenresPublishers,
};