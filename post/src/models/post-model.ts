import mongoose, { Schema } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface PostAttrs {
  title: string;
  content: string;
  categories: {
    id: string;
    name: string;
  }[];
}

interface PostDoc extends mongoose.Document {
  title: string;
  content: string;
  categories: {
    id: string;
    name: string;
  }[];
}

interface PostModel extends mongoose.Model<PostDoc> {
  build(attrs: PostAttrs): PostDoc;
}

const categorySchema = new mongoose.Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
      },
    },
  }
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    categories: [categorySchema],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    timestamps: true,
  }
);
postSchema.set('versionKey', 'version');
postSchema.plugin(updateIfCurrentPlugin);

postSchema.statics.build = (attrs: PostAttrs) => {
  return new Post(attrs);
};

const Post = mongoose.model<PostDoc, PostModel>('Post', postSchema);

export { Post };
