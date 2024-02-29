import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Contact from "./pages/Contact";
import { RootLayout } from "./layout/RootLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import useLocalStorage from "use-local-storage";
import { AuthContext } from "./AuthContext";
import RequireAuth from "./components/RequireAuth";
import TaskList from "./pages/TaskList";
import { ToastContainer } from "react-toastify";

export default function App() {
  const [token, setToken] = useLocalStorage("token");

  return (
    <>
      <AuthContext.Provider value={{ token, setToken }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="register" element={<Register />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<ErrorPage />} />
              <Route path="login" element={<Login />} />
              <Route
                path="tasklist"
                element={
                  <RequireAuth>
                    <TaskList />
                  </RequireAuth>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </AuthContext.Provider>
    </>
  );
}
