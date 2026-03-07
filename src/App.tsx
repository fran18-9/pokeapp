import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router"
import RootLayout from "./layout/RootLayout"
import Pokedex from "./views/Pokedex"
import Habitat from "./views/Habitat"
import TeamBuilder from "./views/TeamBuilder"
import Home from "./views/Home"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="pokedex" element={<Pokedex />} />
      <Route path="habitat" element={<Habitat />} />
      <Route path="teambuilder" element={<TeamBuilder />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
