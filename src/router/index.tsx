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
import { ProjectDetail } from '@/pages/project/project-detail';
import { SSHConfig } from '@/pages/project/ssh-config';
import { Preject } from '@/pages/project';

export const router = (

  <BrowserRouter>
    <StoreProvider>
      <Switch>
        <Route exact path="/login" component={Login} />

        <BasicLayout>
          <Switch>
            <Route exact path="/" component={Preject} />
            <Route exact path="/project/ssh" component={SSHConfig} />
            <Route exact path="/project/:id/detail" component={ProjectDetail} />
          </Switch>
        </BasicLayout>

      </Switch>
    </StoreProvider>
  </BrowserRouter>

);
