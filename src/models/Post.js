// src/models/Post.js
import { BSON } from "realm";

class Post {
  static schema = {
    name: "Post",
    primaryKey: "_id",
    properties: {
      _id: { type: "objectId", default: () => new BSON.ObjectId() },
      title: "string",
      posted_by: "string",
      posted_on: "date",
      last_updated_on: "date",
      category: "string",
      summarized_content: "string",
    },
  };
}

export default Post;
