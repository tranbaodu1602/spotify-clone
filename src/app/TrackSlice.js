import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  playlists: [],
  userInfo: null,
  selectedPlaylist: null,
  currentlyPlaying: null,
  playerState: false,
  selectedPlaylistId: "2uSOij1ZygLNZtEOCXMhcX",
};

const TrackSlice = createSlice({
  initialState,
  name: "track",
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    setPlaylists: (state, action) => {
      console.log("Playlist", action.payload.playlist);
      state.playlists = action.payload.playlists;
    },
    setUser: (state, action) => {
      state.userInfo = action.payload.userInfo;
    },
    setPlaylist: (state, action) => {
      state.selectedPlaylist = action.payload.selectedPlaylist;
    },
    setPlaying: (state, action) => {
      state.currentlyPlaying = action.payload.currentlyPlaying;
    },
    setPlayerState: (state, action) => {
      state.playerState = action.payload.playerState;
    },
    setPlaylistId: (state, action) => {
      state.selectedPlaylistId = action.payload.selectedPlaylistId;
    },
  },
});

export const {
  setToken,
  setPlaylists,
  setUser,
  setPlaylist,
  setPlaying,
  setPlayerState,
  setPlaylistId,
} = TrackSlice.actions;

export const selectToken = (state) => state.track.token;
export const selectedPlaylists = (state) => state.track.playlists;
export const selectedUserInfo = (state) => state.track.userInfo;
export const selectedPlaylist = (state) => state.track.selectedPlaylist;
export const selectedPlaying = (state) => state.track.currentlyPlaying;
export const selectedplayerState = (state) => state.track.playerState;
export const selectedPlaylistId = (state) => state.track.selectedPlaylistId;

export default TrackSlice.reducer;
