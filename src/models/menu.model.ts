import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";

interface MenuAttributes {
  id?: number;
  title: string;
  link?: string;
  isShowing?: boolean;
  parentId?: number;
  subMenus?: MenuAttributes[];
  sequence: number;
}

class Menu extends Model<MenuAttributes> implements MenuAttributes {
  public id!: number;
  public title!: string;
  public link?: string;
  public isShowing?: boolean;
  public parentId?: number;
  public sequence: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Menu.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
    },
    isShowing: {
      type: DataTypes.BOOLEAN,
    },
    parentId: {
      type: DataTypes.INTEGER,
    },
    sequence: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    tableName: "menus",
    timestamps: true,
  }
);

// Association: Menu has many child menus through parentId
Menu.hasMany(Menu, {
  foreignKey: "parentId",
  as: "subMenus",
});

export default Menu;
