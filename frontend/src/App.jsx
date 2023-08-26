<<<<<<<<< Temporary merge branch 1
import { createBrowserRouter, RouterProvider, Route,createRoutesFromElements } from "react-router-dom"
import { RootLayout, Login, SignUp, LandingPage } from "./pages"
=========
import { Navbar ,FooterList} from "./components/landing_page"
>>>>>>>>> Temporary merge branch 2

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<RootLayout />}
        errorElement={<h1>Error 404</h1>}
      >
        <Route index element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
    )
  )
  return (
<<<<<<<<< Temporary merge branch 1
    <RouterProvider router={router}/>
=========
    <>
    <Navbar/>   
    <FooterList/> 
    </>
>>>>>>>>> Temporary merge branch 2
  )
}

export default App;
