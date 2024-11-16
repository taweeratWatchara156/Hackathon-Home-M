import { v } from "convex/values";
import { internalQuery, mutation, query } from "./_generated/server";
import { useQuery } from "convex/react";

export const addRoom = mutation({
  args: {
    hostCode: v.string(),
    partyName: v.string(),
    tripTitle: v.string(),
    tripDescription: v.string(),
    from: v.string(),
    to: v.string(),
    isSchoolTrip: v.boolean(),
    hostId: v.string(),
    partyMembers: v.array(v.object({
      fullName: v.string(),
      username: v.string(),
      imageUrl: v.string(),
      clerkId: v.string(),
      email: v.string(),
  })),
  },
  handler: async (ctx, args) => {
    const createdAt = Date.now();
    await ctx.db.insert("rooms", { ...args, createdAt });
  },
});

export const getRoomByHostCode = query({
  args: { hostCode: v.string() },
  async handler(ctx, args) {
    return ctx.db
      .query("rooms")
      .withIndex("by_hostCode", (q) => q.eq("hostCode", args.hostCode))
      .unique();
  },
});

export const updateRoom = mutation({
  args: {
    hostCode: v.string(),
    partyName: v.optional(v.string()),  // Optional fields
    tripTitle: v.optional(v.string()),
    tripDescription: v.optional(v.string()),
    from: v.optional(v.string()),
    to: v.optional(v.string()),
    isSchoolTrip: v.optional(v.boolean()),
    memberToAdd: v.optional(v.object({
      fullName: v.string(),
      username: v.string(),
      imageUrl: v.string(),
      clerkId: v.string(),
      email: v.string(),
  })),  // Just one member to add
    memberToRemove: v.optional(v.object({
      fullName: v.string(),
      username: v.string(),
      imageUrl: v.string(),
      clerkId: v.string(),
      email: v.string(),
  })),  
  },
  handler: async (ctx, args) => {
    const { hostCode, memberToAdd, memberToRemove, ...otherFields } = args;

    const room = await ctx.db
      .query("rooms")
      .withIndex("by_hostCode", (q) => q.eq("hostCode", args.hostCode))
      .unique();

    if (!room) {
      throw new Error(`Room with hostCode ${args.hostCode} not found`);
    }

    if(memberToAdd){
      await ctx.db.patch(room._id, { partyMembers: [...room.partyMembers, memberToAdd] })
    }

    if (memberToRemove) {
      await ctx.db.patch(room._id, {
        partyMembers: room.partyMembers.filter((member) => member.clerkId !== memberToRemove.clerkId),  // Remove member
      });
    }

    if (Object.keys(otherFields).length > 0) {
      await ctx.db.patch(room._id, otherFields);
    }
  },
});

export const deleteRoomByHostCode = mutation({
  args: { hostCode: v.string() },
  handler: async (ctx, args) => {
    const { hostCode } = args;

    // Find the room by hostCode
    const room = await ctx.db
      .query("rooms")
      .withIndex("by_hostCode", (q) => q.eq("hostCode", hostCode))
      .unique();

    if (!room) {
      throw new Error(`Room with hostCode ${hostCode} not found`);
    }

    // Delete the room
    await ctx.db.delete(room._id);
  },
});