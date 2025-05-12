import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NowPlayingComponentComponent } from './now-playing-component/now-playing-component.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NowPlayingComponentComponent, MovieCardComponent, SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'movie-catalog';
}
