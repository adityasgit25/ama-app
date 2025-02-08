import 'next-auth';

declare module 'next-auth' {
    // basically here we are redefining the interfaces to make the options.ts work properly
    interface Session {
        user : {
            _id?: string;
            isVerified?: boolean;
            isAcceptingMessages ?: boolean;
            username ?: string;
        } & DefaultSession['user'];
    }
    interface User {
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessages ?: boolean;
        username ?: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string;
        isVerified ?: boolean;
        isAcceptingMessages?: boolean;
        username ?: string;
    }
}