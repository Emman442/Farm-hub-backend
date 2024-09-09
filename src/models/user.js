'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require("bcryptjs")

module.exports = (sequelize) => {
  class User extends Model {
    
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      changedPasswordAfter(JWTTimestamp) {
        if (this.passwordChangedAt) {
          const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
          );
          return JWTTimestamp < changedTimestamp;
        }
        return false;
      }
      async validPassword(password) {
        return await bcrypt.compare(password, this.password);
      }
      createPasswordResetToken() {
        const resetToken = crypto.randomBytes(32).toString("hex");
        this.passwordResetToken = crypto
          .createHash("sha256")
          .update(resetToken)
          .digest("hex");
        console.log(resetToken, this.passwordResetToken);
        this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
        return resetToken;
      }
    
    static associate(models) {
      // Define associations here, e.g., 
      // User.hasMany(models.Post, { foreignKey: 'userId' });
    }
  }

  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'First name cannot be empty' },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Last name cannot be empty' },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Must be a valid email' },
        notEmpty: { msg: 'Email cannot be empty' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'password cannot be empty' },
      },
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      // allowNull: false,
      validate: {
        is: { args: /^[0-9]+$/, msg: 'Phone number must contain only digits' },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user', // e.g., 'admin', 'user', etc.
      validate: {
        isIn: {
          args: [['admin', 'user', 'farmer']],
          msg: 'Role must be one of admin, user, or moderator',
        },
      },
    },
    passwordChangedAt: {
      type: DataTypes.DATE,
    },
    passwordResetToken: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users', // Optional: specify table name
    timestamps: true,   // Enable timestamps (createdAt, updatedAt)
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(20);
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeSave: async (user) => {
        const salt = await bcrypt.genSalt(20);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  });

  return User;
};
