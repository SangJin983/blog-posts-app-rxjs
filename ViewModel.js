import { PostModel, CurrentPageState, CurrentPaginationState } from "./Model";
import { PostView, PaginationView } from "./VIew";
import { range } from "rxjs";

export const createViewModel = () => {
  const postModel = new PostModel();
  const currentPageState = new CurrentPageState();
  const currentPaginationState = new CurrentPaginationState();
  const postView = new PostView();
  const paginationView = new PaginationView();

  const POST_PER_PAGE = 5;
  const PAGINATION_RANGE = 3;
  const PAGINATION_END = 20;

  const initApp = () => {
    const updatePosts = (pageNumber) => {
      const start = (pageNumber - 1) * POST_PER_PAGE;
      postModel.fetch(start, POST_PER_PAGE);
    };

    const updatePaginationRange = (pageNumber) => {
      const startPage = Math.max(1, pageNumber - PAGINATION_RANGE);
      const endPage = Math.min(PAGINATION_END, pageNumber + PAGINATION_RANGE);
      const totalPage = endPage - startPage + 1;

      const currentRange = range(startPage, totalPage);
      currentPaginationState.setRange(currentRange);
    };

    paginationView.onPageClick((pageNumber) => {
      currentPageState.setPage(pageNumber);
    });

    currentPageState.subscribe((pageNumber) => {
      updatePosts(pageNumber);
      updatePaginationRange(pageNumber);
    });

    postModel.subscribe((posts) => postView.render(posts));

    currentPaginationState.subscribe((range) => {
      const currentPage = currentPageState.getPage();
      paginationView.render(range);
      paginationView.highlight(currentPage);
    });

    currentPageState.setPage(1);
  };

  return {
    initApp,
  };
};
