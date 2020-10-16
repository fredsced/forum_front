import toFetch from "./toFetch.js";
import { router } from "./router.js";
import { API_DISCUSSIONS } from "./env.js";

export default function postDiscussion(jsonToSend) {
  const options = {
    url: API_DISCUSSIONS,
    method: "POST",
    callBack: router.redirectToDiscussionPage,
    callBackOnError: router.redirectToErrorPage,
    body: jsonToSend,
  };
  toFetch(options);
}
