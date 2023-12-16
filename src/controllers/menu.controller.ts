import { Request, Response } from "express";
import Menu from "../models/menu.model";

const seedFunction = async () => {
  const seedData = [
    {
      title: "Dashboard",
      link: "/",
      sequence: 1,
    },
    {
      title: "Administration",
      isShowing: false,
      sequence: 2,
      subMenus: [
        {
          title: "Company",
          link: "/companies",
          sequence: 1,
        },
        {
          title: "Mapping",
          link: "/mapping",
          sequence: 2,
        },
        {
          title: "Bulk Uploads",
          link: "/uploads",
          sequence: 3,
        },
        {
          title: "Custom Fields",
          link: "/custom_fields",
          sequence: 4,
        },
      ],
    },
    {
      title: "Parties",
      link: "/accounts/parties",

      sequence: 3,
    },
    {
      title: "Suppliers",
      link: "/accounts/suppliers",
      sequence: 4,
    },
    {
      title: "Invoices",
      link: "/invoices",
      sequence: 5,
    },
    {
      title: "Products",
      link: "/products",
      sequence: 6,
    },
    {
      title: "Settings",
      link: "/settings",
      sequence: 7,
    },
  ];
  await Menu.destroy({ where: {} });
  await Menu.bulkCreate(seedData, {
    include: [{ model: Menu, as: "subMenus" }],
  });
};

const getMenu = async () => {
  return await Menu.findAll({
    where: { parentId: null },
    order: [["sequence", "ASC"]],
    include: [
      {
        model: Menu,
        as: "subMenus",
        order: [["sequence", "ASC"]],
      },
    ],
  });
};

export const getMenus = async (req: Request, res: Response) => {
  try {
    let menus = await getMenu();
    if (!menus.length) {
      await seedFunction();
      menus = await getMenu();
    }

    res.json(menus);
  } catch (error) {
    console.error("Error fetching menus:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const seedMenu = async (req: Request, res: Response) => {
  try {
    await seedFunction();
    res.status(201).json({ message: "Menus seeded successfully " });
  } catch (error) {
    console.error("Error fetching menus:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
