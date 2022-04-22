import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "antd/dist/antd.less";
import "./styles.scss";
import App from "./app/App";
import { store, persistor } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { Result, Button } from "antd";

if (process.env.NODE_ENV !== "development") {
  Sentry.init({
    dsn: "https://6e97776c16754f51a3f01d45d9532733@o1107857.ingest.sentry.io/6145050",
    integrations: [new Integrations.BrowserTracing()],
    environment: process.env.NODE_ENV,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}
function Fallback() {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong. Developers have been notified!"
      extra={
        <Button type="text" className="text-primary" onClick={() => { window.location = window.origin}}>
          Back Home
        </Button>
      }
    />
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Sentry.ErrorBoundary fallback={() => <Fallback />}>
            <App />
          </Sentry.ErrorBoundary>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
