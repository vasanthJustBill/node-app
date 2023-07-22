import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";
import Profile from "./profile.model";
import Contact from "./contact.model";
import Address from "./address.model";

interface CompanyAttributes {
  id: number;
  title: string;
  description: string;
  profile_id: number;
}

class Company extends Model<CompanyAttributes> implements CompanyAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public profile_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static readonly VALIDATION_MESSAGES = {
    TITLE_REQUIRED: "Company Title is required",
    PROFILE_REQUIRED: "Profile Id is required",
  };
}

Company.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: Company.VALIDATION_MESSAGES.TITLE_REQUIRED,
        },
        notEmpty: {
          msg: Company.VALIDATION_MESSAGES.TITLE_REQUIRED,
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profile_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: Company.VALIDATION_MESSAGES.PROFILE_REQUIRED,
        },
        notEmpty: {
          msg: Company.VALIDATION_MESSAGES.PROFILE_REQUIRED,
        },
      },
    }
  },
  {
    sequelize,
    tableName: "companies",
    timestamps: true,
  }
);

// Define the associations
Company.belongsTo(Profile, {
  foreignKey: "profile_id",
  as: "profile",
});

Company.hasMany(Contact, {
  foreignKey: "profile_id", // Assuming profile_id is the foreign key linking Contact to Company
  as: "contacts", // The alias to be used when eager loading
});

Company.hasMany(Address, {
  foreignKey: "profile_id", // Assuming profile_id is the foreign key linking Contact to Company
  as: "addresses", // The alias to be used when eager loading
});

export default Company;
