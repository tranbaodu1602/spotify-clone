import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectedPlaying, setPlaying } from "../app/TrackSlice";

export default function CurrentTrack() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const currentlyPlaying = useSelector(selectedPlaying);

  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: `Bearer   ${token}`,
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
        dispatch(setPlaying({ currentlyPlaying }));
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
