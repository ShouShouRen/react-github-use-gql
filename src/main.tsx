import { ApolloProvider } from "@apollo/client";
import { createRoot } from "react-dom/client";
import client from "./apolloClient.ts";
import App from "./App.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App />
    <Toaster />
  </ApolloProvider>
);
