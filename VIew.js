import { fromEvent, Subject } from "rxjs";
import { distinctUntilChanged, filter, map } from "rxjs/operators";

export class PostView {
  #postContainerElement = document.querySelector(".post-container");

  render = (posts) => {
    this.#postContainerElement.innerHTML = "";

    posts.forEach((post) => {
      const postElement = this.#createPostElement(post);
      this.#postContainerElement.append(postElement);
    });
  };

  #createPostElement = (post) => {
    const postElement = document.createElement("div");
    postElement.className = "post";

    postElement.innerHTML = `
        <div class="post-info">
          <div>No. ${post.id}</div>
          <div>User: ${post.userId}</div>
        </div>
        <div class="post-title">${post.title}</div>
        <div class="post-body">${post.body}</div>
      `;

    return postElement;
  };
}

export class PaginationView {
  #paginationContainer = document.querySelector(".pagination-container");
  #pageChange$ = new Subject();

  constructor() {
    this.#pageClick$();
  }

  render(pageRange) {
    this.#paginationContainer.innerHTML = "";
    pageRange.forEach((index) => {
      const pageButton = this.#createElement(index);
      this.#paginationContainer.append(pageButton);
    });
  }

  highlight(pageNumber) {
    const activeButtonElement = document.querySelector(
      `.pagination-button[data-page="${pageNumber}"]`
    );

    activeButtonElement.classList.add("active");
  }

  onPageClick(listener) {
    this.#pageChange$.subscribe(listener);
  }

  #pageClick$() {
    fromEvent(this.#paginationContainer, "click")
      .pipe(
        filter((event) => event.target.classList.contains("pagination-button")),
        map((event) => Number(event.target.textContent)),
        distinctUntilChanged()
      )
      .subscribe((pageNumber) => this.#pageChange$.next(pageNumber));
  }

  #createElement(index) {
    const pageButtonElement = document.createElement("button");
    pageButtonElement.className = "pagination-button";
    pageButtonElement.textContent = index;
    pageButtonElement.setAttribute("data-page", index);

    return pageButtonElement;
  }
}
