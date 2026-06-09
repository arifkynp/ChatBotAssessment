import { lazy } from "solid-js";

import { Route, Router as SolidRouter } from "@solidjs/router";

const Auth = lazy(async () => import("../features/Auth/Auth"));
const Chat = lazy(async () => import("../features/Chat/Chat"));

export const Router = () => (
  <SolidRouter base="">
    <Route path="/" component={Auth} />
    <Route path="/chat" component={Chat} />
  </SolidRouter>
);
