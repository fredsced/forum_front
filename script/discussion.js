import { router } from "./router.js";
import toFetch from "./toFetch.js";
import jsonifier from "./jsonifier.js";
import { API_DISCUSSIONS } from "./env.js";
import postComment from "./postComment.js";

const submitComment = document.getElementById("submitComment");
const formComment = document.getElementById("formComment");
const discussionId = getParamValue("id");

submitComment.addEventListener("click", (event) => {
  event.preventDefault();
  const commentData = new FormData(formComment);
  const dataToSend = jsonifier(commentData);
  postComment(dataToSend, discussionId);
});

const options = {
  url: API_DISCUSSIONS + "/" + discussionId,
  method: "GET",
  callBack: populatePage,
  callBackOnError: router.redirectToErrorPage,
};

document.addEventListener("DOMContentLoaded", (e) => {
  toFetch(options);
});

function populatePage(datas) {
  const { title, text, author, comments } = datas;
  const main = document.getElementById("discussion");
  const div = createNode("div"),
    pTitle = createNode("h4"),
    pText = createNode("p"),
    pAuthor = createNode("p");
  pTitle.innerHTML = title;
  pText.innerHTML = text;
  pAuthor.innerHTML = author;

  div.append(pTitle, pText, pAuthor);

  if (comments !== null) {
    comments.forEach((comment, index) => {
      const numComment = createNode("h5");
      numComment.innerHTML = "Réponse # " + ++index;
      const pCommentAuthor = createNode("p");
      pCommentAuthor.innerHTML = comment.author;
      const pCommentText = (createNode("p").innerHTML = comment.text);
      div.append(numComment, pCommentText, pCommentAuthor);
    });
  }

  main.append(div);
}
// helper to retrieve param value in the url
function getParamValue(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
// helper to create elements
function createNode(element) {
  return document.createElement(element);
}
