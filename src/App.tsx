import { CssBaseline } from "@material-ui/core";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { QueryParamProvider } from "use-query-params";
import UserMiddleware from "./api/auth/components/UserMiddleware/UserMiddleware";
import Auth from "./features/auth/Auth";
import "./index.css";
import FullscreenProgress from "./shared/components/FullscreenProgress/FullscreenProgress";
import { persistor, store } from "./shared/redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<FullscreenProgress />} persistor={persistor}>
        <Router>
          <QueryParamProvider ReactRouterRoute={Route}>
            <CssBaseline />
            <UserMiddleware>
              <Auth />
            </UserMiddleware>
          </QueryParamProvider>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
