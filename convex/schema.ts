import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  events: defineTable({
    title: v.string(),
    desc: v.string(),
    date: v.string(),
  }),
  studies: defineTable({
    name: v.string(),
  }),
  pdfs: defineTable({
    title: v.string(),
    date: v.string(),
    studyId: v.string(),
    pdfId: v.string(),
  }),
  pastorMessage: defineTable({
    message: v.string(),
    coramDeo: v.string(),
    author: v.string(),
  }),
});
