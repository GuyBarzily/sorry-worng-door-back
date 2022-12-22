const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

app.use(cors());
app.use(express.json());

const getReddit = async () => {
  const res = await axios.get(
    "https://www.reddit.com/user/AngelGamesStudio.json?limit=100"
  );
  const posts = res.data.data.children;
  const t3 = posts.filter((item) => {
    return item.kind === "t3";
  });
  const result = [];
  t3.forEach((item) => {
    // console.log(item.data.secure_media);
    if (item.data.secure_media) {
      let json = {
        title: item.data.title,
        thumbnail: item.data.thumbnail,
        video: item.data.secure_media.reddit_video.fallback_url,
        url: item.data.url,
        author: item.data.author,
        subreddit_name_prefixed: item.data.subreddit_name_prefixed,
        comments: item.data.num_comments,
      };
      result.push(json);
    }
  });
  return result;
};
app.get("/redditFeed", async (req, res) => {
  const reddit = await getReddit();
  res.send(reddit);
});
const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

// getReddit();
