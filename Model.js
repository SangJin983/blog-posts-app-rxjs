import { retry, Subject, timeout } from "rxjs";
import { ajax } from "rxjs/ajax";

export class PostModel {
  #POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
  #TIMEOUT_MS = 1000;
  #posts$ = new Subject();

  fetch(start, size) {
    const queryParm = `?_start=${start}&_limit=${size}`;

    ajax
      .getJSON(this.#POSTS_URL + queryParm)
      .pipe(timeout(this.#TIMEOUT_MS), retry(3))
      .subscribe({
        next: (posts) => this.#posts$.next(posts),
        error: (err) => console.error("Failed to fetch posts:", err),
      });
  }

  subscribe(listener) {
    this.#posts$.subscribe(listener);
  }
}
