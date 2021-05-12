import { useState, useEffect} from 'react';
import { api } from '../services/api';
import { Button } from './Button';
import '../styles/sidebar.scss';

import { GenreResponseProps, MovieProps } from "../App";

  interface Props {
    genres: GenreResponseProps[];
    selectedGenreId: number;
    setSelectedGenre: (genres: GenreResponseProps) => void;
    setSelectedGenreId: (id: number) => void;
    setMovies: (movies: MovieProps[]) => void;
  }
  
  export function SideBar({
    genres,
    selectedGenreId,
    setSelectedGenre,
    setSelectedGenreId,
    setMovies,
  }: Props) {

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
      <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>
      </nav>
    );
  }