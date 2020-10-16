import toFetch from "./toFetch.js";
import { router } from "./router.js";
import { API_DISCUSSIONS } from "./env.js";

export default function postComment(jsonToSend, param) {
  const options = {
    url: API_DISCUSSIONS + "/" + param + "/comments",
    method: "PATCH",
    callBack: router.redirectToDiscussionPage,
    callBackOnError: router.redirectToErrorPage,
    body: jsonToSend,
  };
  toFetch(options);
}
