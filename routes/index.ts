import { Router } from "express";
import { authRoute } from "./authRoute";
import { errorRoute } from "./errorRoute";
import { rootRoute } from "./rootRoute";
import { userRoute } from "./userRoute";
import { urlRoute } from "./urlRoute";
import { loginRoute } from "./loginRoute";

export const routes = Router();

routes.use("/api", authRoute);
routes.use(errorRoute);
routes.use(loginRoute);
routes.use(rootRoute);
routes.use(userRoute);
routes.use(urlRoute);


