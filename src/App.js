import React, { useEffect } from "react";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import { useStateProvider } from "./utils/StateProvider";
import { reducerCases } from "./utils/Constants";
import { selectToken, setToken } from "./app/TrackSlice";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  // const [{ token }, dispatch] = useStateProvider();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch(setToken({ token }));
    }
  }, [token, dispatch]);

  //

  return <div>{token ? <Spotify /> : <Login />}</div>;
}
