import React, { useEffect } from "react";
import styled from "styled-components";
import { AiFillClockCircle } from "react-icons/ai";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  selectToken,
  selectedPlaylist,
  selectedPlaylistId,
  setPlayerState,
  setPlaying,
  setPlaylist,
} from "../app/TrackSlice";

export default function Body({ headerBackground }) {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const SelectedPlaylistId = useSelector(selectedPlaylistId);
  const SelectedPlaylist = useSelector(selectedPlaylist);

  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${SelectedPlaylistId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      dispatch(setPlaylist({ selectedPlaylist }));
    };
    getInitialPlaylist();
  }, [token, dispatch, SelectedPlaylistId]);

  const msToMinutesAndSecons = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const playtrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 204) {
      const currentlyPlaying = {
        id,
        name,
        artists,
        image,
      };
      dispatch(setPlaying({ currentlyPlaying }));
      dispatch(setPlayerState({ playerState: true }));
    } else {
      dispatch(setPlayerState({ playerState: true }));
    }
  };
  return (
    <Container data-headerbackground={headerBackground}>
      {SelectedPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={SelectedPlaylist.image} alt="selectedPlaylist" />
            </div>
            <div className="details">
              <span className="type">PLAYLIST</span>
              <h1 className="title">{SelectedPlaylist.name}</h1>
              <p className="description">{SelectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="header__row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
              {SelectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div
                      className="row"
                      key={id}
                      onClick={() =>
                        playtrack(
                          id,
                          name,
                          artists,
                          image,
                          context_uri,
                          track_number
                        )
                      }
                    >
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col detail">
                        <div className="image">
                          <img src={image} alt="tracks" />
                        </div>
                        <div className="info">
                          <span className="name">{name}</span>
                          <span className="artists">{artists}</span>
                        </div>
                      </div>
                      <div className="col">
                        <span className="album">{album}</span>
                      </div>
                      <div className="col">
                        <span>{msToMinutesAndSecons(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0 25px 50px -12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;
      .title {
        color: white;
        font-size: 3rem;
      }
    }
  }
  .list {
    .header__row {
      display: grid;
      grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
      color: #dddcdc;
      margin: 1rem 0 0 0;
      position: sticky;
      top: 18vh;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
      background-color: ${({ "data-headerbackground": headerBackground }) =>
        headerBackground ? "black" : "none"};
    }
    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
        &:hover {
          background-color: rgba(0, 0, 0, 0.4);
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          img {
            height: 40px;
          }
        }
        .detail {
          display: flex;
          gap: 1rem;
          .info {
            display: flex;
            flex-direction: column;
            .name {
              width: 350px;
            }
            .artists {
              font-style: italic;
              color: gray;
            }
          }
        }
        .album {
          width: 300px;
        }
      }
    }
  }
`;
