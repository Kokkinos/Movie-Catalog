import { Component, computed, inject, input, Input } from '@angular/core';
import { Movie } from '../models/models';
import { OneDecimalPipe } from '../pipes/oneDecimal.pipe';
import { MovieService } from '../services/movie-service';
import { SafeUrlPipe } from '../pipes/safeUrl.pipe';

@Component({
  selector: 'app-movie-card',
  imports: [OneDecimalPipe,SafeUrlPipe],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
  host: {
    '[class.expanded]': 'expanded'
  }
})
export class MovieCardComponent {
  private movieService = inject(MovieService);
  @Input() movie!: Movie;
  @Input() genres: { [id: number]: string } = {}; 
  expanded: boolean = false;
  details: any;
  trailer: string | null = null;
  reviews: any[] = []
  similarMovies: any[] = [];
  // expanded = computed(() => this.movieService.expandedMovieId() === this.movie.id);

  toggleDetails() {
    this.expanded = !this.expanded;
    // this.movieService.toggle(this.movie.id);
    if (this.expanded) {
      const id = this.movie.id;
      this.movieService.getMovieDetails(id).subscribe(data => this.details = data);
      this.movieService.getMovieVideos(id).subscribe(video => {
        const trailer = video.results.find((v:any) => v.type === 'Trailer');
        this.trailer = trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
        this.movieService.getMovieReviews(id).subscribe(data => this.reviews = data.results.slice(0,2));
        this.movieService.getSimilarMovies(id).subscribe(data => this.similarMovies = data.results);
      });
    }

  }
}
