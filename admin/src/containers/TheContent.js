import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";

// routes config
import routes from "../routes";
import { useSelector } from "react-redux";
import LoadingComponent from "./LoadingComponent";
import history from "../config/history";

const TheContent = () => {
  const { isAuthenticated, loading = false } = useSelector(
    (state) => state.auth
  );

  console.log(isAuthenticated, loading);
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={LoadingComponent}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <CFade>
                        <route.component {...props} />
                      </CFade>
                    )}
                  />
                )
              );
            })}
            <Redirect from="/" to={"/admin/login"} />
            {loading != true && isAuthenticated != true && (
              <>{history.push("/admin/login")}</>
            )}
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(TheContent);
