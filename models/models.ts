import { DataTypes } from "sequelize";

import { sequelize } from "../db";

export const Users = sequelize.define('users', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' }
});

export const Baskets = sequelize.define('baskets', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

export const BasketsGames = sequelize.define('baskets_games', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

export const Games = sequelize.define('games', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false }
});

export const Genres = sequelize.define('genres', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

export const Publishers = sequelize.define('publishers', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

export const Rating = sequelize.define('rating', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.INTEGER, allowNull: false }
});

export const GameInfo = sequelize.define('game_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false }
});

export const GenresPublishers = sequelize.define('genres_publishers', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

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

Genres.hasMany(Games);
Games.belongsTo(Genres);

Genres.belongsToMany(Publishers, { through: GenresPublishers });
Publishers.belongsToMany(Genres, { through: GenresPublishers });

export const db = {
  sequelize
};