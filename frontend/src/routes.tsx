import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { PessoasPage } from "./pages/Pessoas/PessoasPage";
import { CategoriasPage } from "./pages/Categorias/CategoriasPage";
import { TransacoesPage } from "./pages/Transacoes/TransacoesPage";
import { TotaisPorPessoaPage } from "./pages/Relatorios/TotaisPorPessoaPage";
import { TotaisPorCategoriaPage } from "./pages/Relatorios/TotaisPorCategoriaPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/pessoas" replace />,
      },
      {
        path: "pessoas",
        element: <PessoasPage />,
      },
      {
        path: "categorias",
        element: <CategoriasPage />,
      },
      {
        path: "transacoes",
        element: <TransacoesPage />,
      },
      {
        path: "relatorios/pessoas",
        element: <TotaisPorPessoaPage />,
      },
      {
        path: "relatorios/categorias",
        element: <TotaisPorCategoriaPage />,
      },
    ],
  },
]);