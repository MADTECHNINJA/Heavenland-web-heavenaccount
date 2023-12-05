import { z } from 'zod';

export const AvatarSchema = z.object({
    charUrl: z.string(),
    charId: z.number(),
    thumbnail: z.string(),
});

export type Avatar = z.infer<typeof AvatarSchema>;

export const BuildingBlockSchema = z.object({
    building_game_id: z.string(),
    elevation: z.number(),
    scale: z.number(),
    rotation: z.number(),
    floor: z.number(),
});

export const BuildingSchema = z.object({
    id: z.number(),
    name: z.string(),
    thumbnail: z.string(),
    blocks: z.array(BuildingBlockSchema),
});

export type Building = z.infer<typeof BuildingSchema>;
