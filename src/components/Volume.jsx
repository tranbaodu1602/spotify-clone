import React from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectToken } from "../app/TrackSlice";

export default function Volume() {
  const token = useSelector(selectToken);

  const setVolume = async (e) => {
    await axios.put(
      `https://api.spotify.com/v1/me/player/volume?volume_percent=${e.target.value}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  return (
    <Container>
      <input type="range" min={0} max={100} onMouseUp={(e) => setVolume(e)} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: center;
  input {
    width: 15rem;
    border-radius: 2rem;
    height: 0.5rem;
  }
`;
