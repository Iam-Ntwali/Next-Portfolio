import { Document, Schema, model } from "mongoose";

interface Faq extends Document {
  question: string;
  answer: string;
}

interface Category extends Document {
  title: string;
}

interface BannerImage extends Document {
  public_id: string;
  url: string;
}

interface Layout extends Document {
  type: string;
  faq: Faq[];
  categories: Category[];
  banner: {
    title: string;
    subtitles: string;
    image: BannerImage;
  };
}

const faqSchema = new Schema<Faq>({
  question: { type: String },
  answer: { type: String },
});

const categorySchema = new Schema<Category>({
  title: { type: String },
});

const bannerImageSchema = new Schema<BannerImage>({
  public_id: { type: String },
  url: { type: String },
});

const layoutSchema = new Schema<Layout>({
  type: { type: String },
  faq: [faqSchema],
  categories: [categorySchema],
  banner: {
    title: { type: String },
    subtitles: { type: String },
    image: bannerImageSchema,
  },
});

const LayoutModel = model<Layout>("Layout", layoutSchema);

export default LayoutModel;
