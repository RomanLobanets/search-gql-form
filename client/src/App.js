import React from "react";
import { ApolloProvider } from "@apollo/client";
import "./App.css";
import { ApolloClient, InMemoryCache } from "@apollo/client";

import SearchForm from "./SearchForm/SearchForm";
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <SearchForm></SearchForm>
    </ApolloProvider>
  );
}

export default App;
