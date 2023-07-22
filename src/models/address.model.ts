import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";

interface AddressAttributes {
  id: number;
  title: string;
  address: number | null;
  profile_id: number;
}

class Address extends Model<AddressAttributes> implements AddressAttributes {
  public id!: number;
  public title!: string;
  public address!: number | null;
  public profile_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static readonly VALIDATION_MESSAGES = {
    TITLE_REQUIRED: "Address Title is required",
    ADDRESS_REQUIRED: "Address is required",
    PROFILE_REQUIRED: "Profile Id is required",
  };
}

Address.init(
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
          msg: Address.VALIDATION_MESSAGES.TITLE_REQUIRED,
        },
        notEmpty: {
          msg: Address.VALIDATION_MESSAGES.TITLE_REQUIRED,
        },
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: Address.VALIDATION_MESSAGES.ADDRESS_REQUIRED,
        },
        notEmpty: {
          msg: Address.VALIDATION_MESSAGES.ADDRESS_REQUIRED,
        },
      },
    },
    profile_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: Address.VALIDATION_MESSAGES.PROFILE_REQUIRED,
        },
        notEmpty: {
          msg: Address.VALIDATION_MESSAGES.PROFILE_REQUIRED,
        },
      },
    },
  },
  {
    sequelize,
    tableName: "addresses",
    timestamps: true,
  }
);

export default Address;
