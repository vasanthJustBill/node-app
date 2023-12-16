import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";
import Company from "./company.model";

interface PartyAttributes {
  id: number;
  name: string;
  gstType: string;
  gstin: number;
  primaryContact: number;
  alternateContact: number;
  primaryEmail: string;
  alternateEmail: string;
  shippingAddress: string;
  billingAddress: string;
  companyId: number;
}

class Party extends Model<PartyAttributes> implements PartyAttributes {
  public id!: number;
  public name!: string;
  public gstType!: string;
  public gstin!: number;
  public primaryContact: number;
  public alternateContact: number;
  public primaryEmail: string;
  public alternateEmail: string;
  public shippingAddress: string;
  public billingAddress: string;
  public companyId!: number;

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
        primaryContact: {
          type: DataTypes.BIGINT,
          validate: {
            isInt: {
              msg: "Primary Contact must be an integer",
            },
          },
        },
        alternateContact: {
          type: DataTypes.BIGINT,
          validate: {
            isInt: {
              msg: "Alternate Contact must be an integer",
            },
          },
        },
        primaryEmail: {
          type: DataTypes.STRING,
          validate: {
            isEmail: {
              msg: "Invalid email format",
            },
          },
        },
        alternateEmail: {
          type: DataTypes.STRING,
          validate: {
            isEmail: {
              msg: "Invalid email format",
            },
          },
        },
        shippingAddress: {
          type: DataTypes.STRING,
        },
        billingAddress: {
          type: DataTypes.STRING,
        },
        companyId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notNull: {
              msg: "Company ID is required",
            },
            notEmpty: {
              msg: "Company ID cannot be empty",
            },
          },
        },
      },
      {
        sequelize,
        tableName: "parties",
        timestamps: true,
      }
    );
  }

  static associate(): void {
    Party.belongsTo(Company, {
      foreignKey: "companyId",
      as: "company",
    });
  }
}

// Initialize the Party model
Party.initModel();
Party.associate();

export default Party;
