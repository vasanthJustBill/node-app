import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";
import Party from "./party.model";

interface CompanyAttributes {
  id: number;
  name: string;
  description: string;
  shippingAddress: string;
  billingAddress: string;
  primaryContact: string;
  alternateContact: string;
  primaryEmail: string;
  alternateEmail: string;
  businessType: string;
  website: string;
  gstType: string;
  gstin: string;
}

class Company extends Model<CompanyAttributes> implements CompanyAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public shippingAddress!: string;
  public billingAddress: string;
  public primaryContact!: string;
  public alternateContact: string;
  public primaryEmail!: string;
  public alternateEmail: string;
  public businessType!: string;
  public website: string;
  public gstType: string;
  public gstin: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Company.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    shippingAddress: {
      type: DataTypes.STRING,
    },
    billingAddress: {
      type: DataTypes.STRING,
    },
    primaryContact: {
      type: DataTypes.STRING,
    },
    alternateContact: {
      type: DataTypes.STRING,
    },
    primaryEmail: {
      type: DataTypes.STRING,
    },
    alternateEmail: {
      type: DataTypes.STRING,
    },
    businessType: {
      type: DataTypes.STRING,
    },
    website: {
      type: DataTypes.STRING,
    },
    gstType: {
      type: DataTypes.STRING,
    },
    gstin: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "companies",
    timestamps: true,
  }
);

export default Company;
