import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";


axios.defaults.withCredentials = true;

const initialState = {
  isAuthenticated: !!localStorage.getItem("isAuthenticated"),
  user: JSON.parse(localStorage.getItem("user")),
  loading: false,
};

export const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        error: null,
        loading: false,
      };
    case "REGISTER":
      return { ...state, error: null, loading: false };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
        loading: false,
      };
    case "AUTH_ERROR":
      return { ...state, loading: false };
    case "REMOVE_LOADING":
      return { ...state, loading: false };
    case "SET_LOADING":
      return { ...state, loading: true };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);


  useEffect(() => {
    const fetchSessionData = async () => {
      dispatch({ type: "SET_LOADING" });
      try {
        const res = await axios.get(
          "http://portalnhorizonv.byethost13.com/backend/controlador/Usuarios/ObtenerSesion.php",
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (res.data.user) {
          dispatch({ type: "LOGIN", payload: res.data.user });
        } else {
          dispatch({ type: "AUTH_ERROR", payload: "No active session" });
        }
      } catch (err) {
        dispatch({ type: "AUTH_ERROR", payload: "" });
      }
    };
    fetchSessionData();
  }, [state.isAuthenticated, state.user]);

  const login = async (email, password) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.post(
        "http://portalnhorizonv.byethost13.com/backend/controlador/Usuarios/IniciarSesion.php",
        { email, password }
      );
      const { status, data } = res?.data;

      if (status) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(data.usuario));
        dispatch({ type: "LOGIN", payload: { user: data.usuario } });
        return { success: true };
      } else {
        const { message } = res.data;
        dispatch({ type: "AUTH_ERROR", payload: message });
        return { success: false, message };
      }
    } catch (err) {
      dispatch({ type: "REMOVE_LOADING" });
      const { message } = err?.response?.data?.data || "Error de red";
      dispatch({ type: "AUTH_ERROR", payload: message });
      return { success: false, message };
    }
  };

  const logout = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      await axios.post(
        "http://portalnhorizonv.byethost13.com/backend/controlador/Usuarios/CerrarSesion.php",
        {}
      );
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
      Cookies.remove("PHPSESSID");
      dispatch({ type: "LOGOUT" });
      return { success: true };
    } catch (err) {
      console.error("Logout failed:", err);
      dispatch({ type: "AUTH_ERROR", payload: "Logout failed" });
      setAlert("No se pudo cerrar sesion", "error");
      return { success: false };
    }
  };

  const register = async (
    nombres,
    apellidos,
    edad,
    email,
    password,
    t_identificacion,
    n_identificacion,
    telefono,
    t_genero
  ) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.post(
        "http://portalnhorizonv.byethost13.com/backend/controlador/Usuarios/CrearUsuario.php",
        {
          nombres,
          apellidos,
          edad,
          email,
          password,
          t_identificacion,
          n_identificacion,
          telefono,
          t_genero,
        }
      );
      const { status, data:{message, error} } = res.data;
      if (status === "success") {
        dispatch({ type: "REGISTER" });
        return { success: true, message };
      } else {
        dispatch({ type: "AUTH_ERROR", payload: message });
        return { success: false, error };
      }
    } catch (err) {
      
      const message = err.response?.data?.data?.error || "Error de red";
      dispatch({ type: "AUTH_ERROR", payload: message });
      return { success: false, message };
    }
  };

  const updateProfile = async (
    id,
    nombres,
    apellidos,
    edad,
    email,
    telefono,
    passwordActual = null,
    password = null
  ) => {
    dispatch({ type: "SET_LOADING" });

    const payload = {
      id,
      nombres,
      apellidos,
      edad,
      email,
      telefono,
      passwordActual,
      password,
    };

    try {
      const res = await axios.put(
        "http://portalnhorizonv.byethost13.com/backend/controlador/Usuarios/ActualizarUsuario.php",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { message, error } = res.data.data;
      if (res.status === 200) {
        // Actualizamos los datos del usuario en localStorage
        const updatedUser = {
          ...state.user,
          nombres,
          apellidos,
          edad,
          email,
          telefono,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        logout()
        dispatch({ type: "LOGIN", payload: { user: updatedUser } });
        return { success: true, message };
      } else {
        // setAlert(error, "error");
        dispatch({ type: "AUTH_ERROR", payload: error });
        return { success: false, message: error };
      }
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.data?.error || "Error en la red";
      // setAlert(message, "error");
      dispatch({ type: "AUTH_ERROR", payload: message });
      return { success: false, message };
    }
  };

  const checkSession = () => {
    const user = localStorage.getItem("user");
    return !!user;
  };

  const deleteAccount = async (id) => {
    try {
      const response = await axios.delete(
        `http://portalnhorizonv.byethost13.com/backend/controlador/Usuarios/EliminarUsuario.php?id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        dispatch({type: "LOGOUT"})
        return { success: true, message: response.data.data.message };
      } else {
        return {
          success: false,
          message: response.data.data.error || "Error al eliminar la cuenta",
        };
      }
    } catch (error) {
      console.error("Error eliminando la cuenta:", error);
      return {
        success: false,
        message: error.response?.data?.data?.error || "Error de red",
      };
    }
  };


  return (
    <AuthContext.Provider
      value={{ ...state, login, logout, register, updateProfile, checkSession, deleteAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
};
