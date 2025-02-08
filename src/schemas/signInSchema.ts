import {z} from 'zod';

export const signInSchema = z.object({
    // identifier can be usernmame or email, its a production language of using name as identifier.
    identifier: z.string(),
    password: z.string(),
});