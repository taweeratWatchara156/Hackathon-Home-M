import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
    users: defineTable({
        fullName: v.string(),
        username: v.string(),
        imageUrl: v.string(),
        clerkId: v.string(),
        email: v.string(),
    }).index("by_email", ["email"]).index("by_clerkId", ["clerkId"]),

    rooms: defineTable({
        hostCode: v.string(),
        partyName: v.string(),
        tripTitle: v.string(),
        tripDescription: v.string(),
        from: v.string(),
        to: v.string(),
        isSchoolTrip: v.boolean(),
        hostMembers: v.array(v.object({
            fullName: v.string(),
            username: v.string(),
            imageUrl: v.string(),
            clerkId: v.string(),
            email: v.string(),
        })),
        partyMembers: v.array(v.object({
            fullName: v.string(),
            username: v.string(),
            imageUrl: v.string(),
            clerkId: v.string(),
            email: v.string(),
        })),
        createdAt: v.number(), // Store timestamp
    }).index("by_hostCode", ["hostCode"]),
})

