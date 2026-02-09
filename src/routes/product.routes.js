import { Router } from "express";
import { Product } from "../models/Product.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; 
    const page = parseInt(req.query.page) || 1;
    const sortOrder = req.query.sort; 
    const search = req.query.query; 

    // FILTRO
    const filter = {};
    if (search) {
      filter.$or = [
        {
          $expr: {
            $regexMatch: {
              input: { $toLower: "$title" },
              regex: search.toLowerCase()
            }
          }
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toLower: "$category" },
              regex: search.toLowerCase()
            }
          }
        }
      ];
    }

    // OPCIONES DE PAGINACION
    const options = {
      page: page,
      limit: limit,
      lean: true
    };
// ORDEN ASC & DESC
    if (sortOrder === "asc") options.sort = { price: 1 }; 
    if (sortOrder === "desc") options.sort = { price: -1 }; 
// OBTENER PRODUCTOS
    const result = await Product.paginate(filter, options); 
// LINK PAGINA ANTERIOR
    const baseUrl = req.protocol + "://" + req.get("host") + req.path;
    const prevLink = result.hasPrevPage
      ? `${baseUrl}?page=${result.prevPage}&limit=${limit}${sortOrder ? `&sort=${sortOrder}` : ""}${search ? `&query=${search}` : ""}`
      : null; 
// LINK PAGINA SIGUIENTE
    const nextLink = result.hasNextPage
      ? `${baseUrl}?page=${result.nextPage}&limit=${limit}${sortOrder ? `&sort=${sortOrder}` : ""}${search ? `&query=${search}` : ""}`
      : null; 
    // RESPUESTA
    res.json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink,
      nextLink
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: "NO SE PUDIERON OBTENER LOS PRODUCTOS" });
  }
});

export default router;
