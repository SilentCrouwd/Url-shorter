import { Router, type Request, type Response } from "express";
import { generateRndSting } from "./url.service.js";
import {
  createDB_Item,
  deleteUrl,
  getLongUrl,
  updateUrl,
} from "./url_db/url.db.js";
import type {
  createUrlDto,
  postReqDto,
  requestIdDto,
} from "../../types/url.interface.js";
import { HtttpException } from "../../error/Htttpexeption.js";

const urlRouter = Router();

urlRouter.get(
  "/:id",
  (req: Request<requestIdDto, {}, createUrlDto>, res: Response) => {
    const id = req.params.id;
    try {
      res.redirect(200, getLongUrl(String(id)));
    } catch (error: unknown) {
      if (error instanceof HtttpException)
        res.status(error.status).json({ message: error.message });
    }
  },
);

urlRouter.post(
  "/shorten",
  (req: Request<{}, {}, postReqDto>, res: Response) => {
    try {
      const long_Url = req.body.long_Url;
      const short_Url = generateRndSting(long_Url, 6);

      createDB_Item(short_Url, long_Url);

      res.status(201).json({ short_Url: short_Url });
    } catch (error: unknown) {
      if (error instanceof HtttpException)
        res.status(error.status).json({ message: error.message });
    }
  },
);

urlRouter.delete("/:id", (req: Request<requestIdDto>, res: Response) => {
  const id = req.params.id;
  try {
    deleteUrl(String(id));
    res.status(202).json("Erfolgreich gelöscht");
  } catch (error: unknown) {
    if (error instanceof HtttpException)
      res.status(error.status).json({ message: error.message });
  }
});

urlRouter.put(
  "/:id",
  (req: Request<requestIdDto, {}, postReqDto>, res: Response) => {
    const id = req.params.id;
    const longUrl = req.body.long_Url;
    try {
      updateUrl(String(id), longUrl);
      res.status(201).json("Erfolgreich geändert");
    } catch (error: unknown) {
      if (error instanceof HtttpException)
        res.status(error.status).json({ message: error.message });
    }
  },
);

export default urlRouter;
