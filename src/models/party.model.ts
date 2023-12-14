import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";

interface PartyAttributes {
  id: number;
  name: string;
  gstType: string;
  gstin: number;
  contact: number;
  email: string;
  address: string;
  state: string;
}

class Party extends Model<PartyAttributes> implements PartyAttributes {
  public id!: number;
  public name!: string;
  public gstType!: string;
  public gstin!: number;
  public contact: number;
  public email: string;
  public address: string;
  public state: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  /**
   * Initialize the Party model with attributes and validations.
   */
  static initModel(): void {
    Party.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: "Party Name is required",
            },
            notEmpty: {
              msg: "Party Name cannot be empty",
            },
          },
        },
        gstType: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: "GST Type is required",
            },
            notEmpty: {
              msg: "GST Type cannot be empty",
            },
          },
        },
        gstin: {
          type: DataTypes.BIGINT,
          allowNull: false,
          validate: {
            notNull: {
              msg: "GSTIN is required",
            },
            isInt: {
              msg: "GSTIN must be an integer",
            },
          },
        },
        contact: {
          type: DataTypes.BIGINT,
          validate: {
            isInt: {
              msg: "Contact must be an integer",
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          validate: {
            isEmail: {
              msg: "Invalid email format",
            },
          },
        },
        address: {
          type: DataTypes.STRING,
        },
        state: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        tableName: "parties",
        timestamps: true,
      }
    );
  }
}

// Initialize the Party model
Party.initModel();

export default Party;
