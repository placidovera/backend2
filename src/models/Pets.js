import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const petSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
    index: true    
  },
  species: { 
    type: String, // perro, gato, etc.
    required: true,
    index: true     
  },
    breed: {
    type: String
  },
  age: {
    type: Number // en años o meses (definí cómo lo vas a manejar)
  },
  size: {
    type: String // chico, mediano, grande
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["disponible", "adoptado"],
    default: "disponible"
  },
  images: {
    type: [String] 
  },
  vaccinated: {
    type: Boolean,
    default: false
  },
  stock: { type: Number, default: 0 }
});

petSchema.plugin(mongoosePaginate);

export const Pets = mongoose.model("Pets", petSchema);