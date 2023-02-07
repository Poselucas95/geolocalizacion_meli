import React from "react";
import "./App.css";
import Main from "./routes/index";
import Header from "./components/Header/Header";
import { Content } from "antd/es/layout/layout";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Content className="home-layout">
          <Header />
          <Main />
        </Content>
      </QueryClientProvider>
    </>
  );
}
