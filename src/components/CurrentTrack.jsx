import React, { useEffect } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

export default function CurrentTrack() {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.data !== "") {
        const { item } = response.data;
        const currentlyPlaying = {
          id: item.id,
          name: item.name,
          artists: item.artists.map((artist) => artist.name),
          image: item.album.images[2].url,
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
      }
    };
    getCurrentTrack();
  }, [token, dispatch]);

  return (
    <Container>
      {currentlyPlaying && (
        <div className="track">
          <div className="track__img">
            <img src={currentlyPlaying.image} alt="currenplaying" />
          </div>
          <div className="track__info">
            <span className="name">{currentlyPlaying.name}</span>
            <span className="artists">
              {currentlyPlaying.artists.join(", ")}
            </span>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;

    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;

      .name {
        color: white;
        font-weight: bold;
      }
      .artists {
        color: #b3b3b3;
        font-style: italic;
        font-size: 12px;
      }
    }
  }
`;
