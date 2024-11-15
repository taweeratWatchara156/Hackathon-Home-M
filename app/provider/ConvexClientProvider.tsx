"use client"

import { RedirectToSignIn, useAuth } from "@clerk/nextjs";
import { Authenticated, AuthLoading, ConvexReactClient, Unauthenticated } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import LoadingLogo from "../components/LoadingLogo";

type Props = {
    children: React.ReactNode;
}

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL as string;
const convex = new ConvexReactClient(CONVEX_URL);

export default function ConvexClientProvider({ children }: Props) {
    return (
        <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
            {children}

            <AuthLoading>
                <LoadingLogo/>
            </AuthLoading>
        </ConvexProviderWithClerk>
    )
}