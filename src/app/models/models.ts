export interface Genre {
    id: number,
    name: string
}

export interface GenreResponse {
    genres: Genre[]
}

export interface Movie {
    id: number;
    title: string;
    overview: string;
    genre_ids: number[];
    poster_path: string | null;
    release_date: string;
    vote_average: number;
}

export interface NowPlayingResponse {
    results: Movie[];
    page: number;
    total_pages: number;
    total_results: number;
}

export interface SearchMovieResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface Video {
    key: string;
    type: string;
    site: string;
    name: string;
}

export interface VideoResponse {
    results: Video[];
}

export interface Review {
    id: string;
    author: string;
    content: string;
    created_at: string;
}

export interface ReviewResponse {
    results: Review[];
}

export interface MovieDetails extends Movie {
    runtime: number;
    genres: Genre[];
    tagline: string;
}
