import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";
import Contact from "./contact.model";
import Address from "./address.model";

interface ProfileAttributes {
  id: number;
  title: string;
}

class Profile extends Model<ProfileAttributes> implements ProfileAttributes {
  public id!: number;
  public title!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static readonly VALIDATION_MESSAGES = {
    TITLE_REQUIRED: "Profile Title is required",
  };
}

Profile.init(
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
          msg: Profile.VALIDATION_MESSAGES.TITLE_REQUIRED,
        },
        notEmpty: {
          msg: Profile.VALIDATION_MESSAGES.TITLE_REQUIRED,
        },
      },
    },
  },
  {
    sequelize,
    tableName: "profiles",
    timestamps: true,
  }
);

// Define the associations
Profile.hasMany(Contact, {
  foreignKey: "profile_id",
  as: "contacts",
});

Profile.hasMany(Address, {
  foreignKey: "profile_id",
  as: "addresses",
});

export default Profile;
