import { query } from "./_generated/server";
import { v } from "convex/values";

export const getEvents = query({
  handler: async (ctx) => {
    const events = await ctx.db
      .query("events")
      .collect();
    return events;
  },
});
