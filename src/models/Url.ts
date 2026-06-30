// importa o mongoose
import mongoose from 'mongoose';
import type { InferSchemaType } from 'mongoose';

// Cria o Schema do mongoose
const Schema = mongoose.Schema;

// Schema do link, com os campos que quero guardar no banco
const urlSchema = new Schema({
  // Link real que vai ser encurtado
  originalUrl: {
    type: String,
    required: true,
  },
  // Codigo unico da URL encurtada
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  // Contador de clicks, comeca em 0
  clicks: {
    type: Number,
    default: 0,
  },
  // Data de criacao do link, com valor padrao do momento que for criado
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Tipagem do Schema
export type UrlDocument = InferSchemaType<typeof urlSchema>;

// Cria a collection baseada no Schema
const Url = mongoose.model<UrlDocument>('Url', urlSchema);

// Exporta pra usar nas rotas
export default Url;
