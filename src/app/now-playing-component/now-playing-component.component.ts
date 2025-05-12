import {
  Component,
  computed,
  effect,
  HostListener,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MovieService } from '../services/movie-service';
import { GenreResponse } from '../models/models';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-now-playing-component',
  imports: [MovieCardComponent, CommonModule, SearchComponent],
  templateUrl: './now-playing-component.component.html',
  styleUrl: './now-playing-component.component.css',
})
export class NowPlayingComponentComponent implements OnInit {
  private movieService = inject(MovieService);
  movies: any[] = [];
  genres: { [id: number]: string } = {};

  page: number = 0;
  loading = signal(false);
  searchParam!: string;
  isSearching: boolean = false;

  ngOnInit(): void {
    this.movieService.getGenres().subscribe((data) => {
      data.genres.forEach((genre: any) => {
        this.genres[genre.id] = genre.name;
      });
    });
    this.loadMore();
  }

  loadMore() {
    if (this.loading()) return;
    this.loading.set(true);
    this.page++;

    if (this.isSearching) {
      this.searchMovies();
      return;
    }
    this.getNowPlaying();
  }

  onSearch(title: string | null) {
    this.movies = [];

    if (!title?.length) {
      this.isSearching = false;
      this.searchParam = '';
      this.page = 0;
      this.loadMore();
      return;
    }

    this.loading.set(true);
    this.searchParam = title;
    this.isSearching = true;
    this.page = 1;
    this.searchMovies();
  }

  @HostListener('window:scroll', [])
  onScroll() {
    // console.log(event.target.scrollTop);
    const scrollTop = window.scrollY;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    // console.log(scrollTop,clientHeight, scrollHeight);
    // console.log(scrollTop + clientHeight);
    // console.log(scrollHeight);

    if (scrollTop + clientHeight >= scrollHeight - 200) {
      this.loadMore();
    }
  }

  private getNowPlaying() {
    this.movieService.getNowPlaying(this.page).subscribe((data) => {
      this.movies.push(...data.results);
      this.loading.set(false);
    });
  }

  private searchMovies() {
    this.movieService
      .searchMovies(this.searchParam, this.page)
      .subscribe((data) => {
        this.movies.push(...data.results);
        this.loading.set(false);
      });
  }
}
