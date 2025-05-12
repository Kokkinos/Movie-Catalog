import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Genre,
  GenreResponse,
  NowPlayingResponse,
  ReviewResponse,
  SearchMovieResponse,
  VideoResponse,
} from '../models/models';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private httpClient = inject(HttpClient);
  private apiKey = 'eb46c700349d0bc443b533a821cec5db';
  private baseUrl = 'https://api.themoviedb.org/3';
  expandedMovieId = signal<number | null>(null);

  toggle(id: number) {
    this.expandedMovieId.set(this.expandedMovieId() === id ? null: id);
  }

  private get<T>(endpoint: string, params: any = {}): Observable<T> {
    return this.httpClient.get<T>(this.baseUrl + endpoint, {
      params: { api_key: this.apiKey, language: 'en-US', ...params },
    });
  }
  getNowPlaying(page = 1): Observable<NowPlayingResponse> {
    return this.get('/movie/now_playing', { page });
  }

  searchMovies(query: string, page = 1): Observable<SearchMovieResponse> {
    return this.get('/search/movie', { query, page });
  }

  getGenres(): Observable<GenreResponse> {
    return this.get<GenreResponse>('/genre/movie/list');
  }

  getMovieDetails(id: number) {
    return this.get(`/movie/${id}`);
  }

  getMovieVideos(id: number): Observable<VideoResponse> {
    return this.get(`/movie/${id}/videos`);
  }

  getMovieReviews(id: number): Observable<ReviewResponse> {
    return this.get(`/movie/${id}/reviews`, { page: 1 });
  }

  getSimilarMovies(id: number): Observable<NowPlayingResponse> {
    return this.get(`/movie/${id}/similar`);
  }
}
