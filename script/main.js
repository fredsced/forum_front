import postDiscussion from "./postDiscussion.js";
import jsonifier from "./jsonifier.js";

const submitDiscussion = document.getElementById("submitDiscussion");
const formDiscussion = document.getElementById("formDiscussion");

submitDiscussion.addEventListener("click", (e) => {
  e.preventDefault();
  const discussionDatas = new FormData(formDiscussion);
  const jsonToSend = jsonifier(discussionDatas);
  postDiscussion(jsonToSend);
});
