import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";

interface ContactAttributes {
  id: number;
  title: string;
  contact: string | null;
  profile_id: number;
}

class Contact extends Model<ContactAttributes> implements ContactAttributes {
  public id!: number;
  public title!: string;
  public contact!: string | null;
  public profile_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static readonly VALIDATION_MESSAGES = {
    TITLE_REQUIRED: "Contact Title is required",
    CONTACT_REQUIRED: "Contact Number is required",
    PROFILE_REQUIRED: "Profile Id is required",
    CONTACT_INVALID: "Invalid contact format. Only numbers are allowed.",
  };
}

Contact.init(
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
          msg: Contact.VALIDATION_MESSAGES.TITLE_REQUIRED,
        },
        notEmpty: {
          msg: Contact.VALIDATION_MESSAGES.TITLE_REQUIRED,
        },
      },
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: Contact.VALIDATION_MESSAGES.CONTACT_REQUIRED,
        },
        notEmpty: {
          msg: Contact.VALIDATION_MESSAGES.CONTACT_REQUIRED,
        },
        isValidContact(value: string) {
          // Custom validator function to check if the contact contains only numbers and '+'
          const contactRegex = /^[0-9]+$/;
          if (!contactRegex.test(value)) {
            throw new Error(Contact.VALIDATION_MESSAGES.CONTACT_INVALID);
          }
        },
      },
    },
    profile_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: Contact.VALIDATION_MESSAGES.PROFILE_REQUIRED,
        },
        notEmpty: {
          msg: Contact.VALIDATION_MESSAGES.PROFILE_REQUIRED,
        },
      },
    },
  },
  {
    sequelize,
    tableName: "contacts",
    timestamps: true,
  }
);

export default Contact;
