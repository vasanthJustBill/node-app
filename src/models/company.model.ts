import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";

interface CompanyAttributes {
  id: number;
  name: string;
  description: string;
}

class Company extends Model<CompanyAttributes> implements CompanyAttributes {
  public id!: number;
  public name!: string;
  public description!: string;

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
      validate: {
        notNull: {
          msg: 'Company name is required',
        },
        notEmpty: {
          msg: 'Company name cannot be empty',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "companies",
    timestamps: true,
  }
);

export default Company;
