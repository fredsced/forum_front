import { router } from "./router.js";
import toFetch from "./toFetch.js";
import jsonifier from "./jsonifier.js";
import { API_DISCUSSIONS } from "./env.js";
import postComment from "./postComment.js";

const submitComment = document.getElementById("submitComment");
const formComment = document.getElementById("formComment");
const param = getParam("id");

submitComment.addEventListener("click", (e) => {
  e.preventDefault();
  const commentData = new FormData(formComment);
  const dataToSend = jsonifier(commentData);
  postComment(dataToSend, param);
});

const options = {
  url: API_DISCUSSIONS + "/" + param,
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
    comments.forEach((c, index) => {
      const numComment = createNode("h5");
      numComment.innerHTML = "Réponse # " + ++index;
      const pCommentAuthor = createNode("p");
      pCommentAuthor.innerHTML = c.author;
      const pCommentText = (createNode("p").innerHTML = c.text);
      div.append(numComment, pCommentText, pCommentAuthor);
    });
  }

  main.append(div);
}
function getParam(sVar) {
  return unescape(
    window.location.search.replace(
      new RegExp(
        "^(?:.*[&\\?]" +
          escape(sVar).replace(/[\.\+\*]/g, "\\$&") +
          "(?:\\=([^&]*))?)?.*$",
        "i"
      ),
      "$1"
    )
  );
}
// helper to create elements
function createNode(element) {
  return document.createElement(element);
}
