import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  titleInput = new FormControl('');
  movies = signal<any[]>([]);
  page = signal(1);
  loading = signal(false);

  @Output() search = new EventEmitter<string | null>();

  ngOnInit() {
    this.titleInput.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => {
        this.search.emit(value);
      });
  }
}
