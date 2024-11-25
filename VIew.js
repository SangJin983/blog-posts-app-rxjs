export const renderPosts = () => {
  const postContainerElement = document.querySelector(".post-container");

  const createPostElement = (post) => {
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

  const render = (posts) => {
    postContainerElement.innerHTML = "";

    posts.forEach((post) => {
      const postElement = createPostElement(post);
      postContainerElement.append(postElement);
    });
  };

  return {
    render,
  };
};
