import { PostModel } from "./Model";
import { renderPosts } from "./VIew";

export const createViewModel = () => {
  const postModel = new PostModel();
  const postsRenderer = renderPosts();

  const initApp = () => {
    postModel.subscribe(postsRenderer.render);
    postModel.fetch(0, 5);
  };

  return {
    initApp,
  };
};
