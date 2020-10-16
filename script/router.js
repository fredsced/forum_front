export const router = {
  redirectToErrorPage: function () {
    window.location.href = "./error.html";
  },
  redirectToDiscussionPage: function (data) {
    window.location.href = "./discussion.html?id=" + data.id;
  },
};
