import mongoose, { Schema } from "mongoose";

interface IURL extends Document {
    originalURL: string;
  shortURL: string;
}

const urlSchema: Schema = new Schema<IURL>({
  originalURL: { type: String, require: true },
  shortURL: { type: String, require: true, unique: true },
});

const urlModel = mongoose.model<IURL>("url", urlSchema);

export default urlModel;
