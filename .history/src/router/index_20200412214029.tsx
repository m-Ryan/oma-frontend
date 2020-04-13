import React from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import { Home } from "../pages/home/index";
import { StoreProvider } from '../modal';
import { Login } from "@/pages/login";
import { BasicLayout } from "@/layouts/basic-layout";

export const router = (
  <StoreProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />

        <BasicLayout>
          <Switch>
            <Route path="/home" component={Home} />
          </Switch>
        </BasicLayout>

      </Switch>
    </BrowserRouter>
  </StoreProvider>
);
