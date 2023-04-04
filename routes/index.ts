import { Router } from "express";
import { authRoute } from "./authRoute";
import { errorRoute } from "./errorRoute";
import { rootRoute } from "./rootRoute";
import { userRoute } from "./userRoute";
import { urlRoute } from "./urlRoute";

export const routes = Router();

routes.use(authRoute);
routes.use(errorRoute);
routes.use(rootRoute);
routes.use(userRoute);
routes.use(urlRoute);
