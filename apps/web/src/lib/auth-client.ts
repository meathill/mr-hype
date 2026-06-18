'use client';

import { createAuthClient } from 'better-auth/react';

// 同源，baseURL 由浏览器推断
export const authClient = createAuthClient();
export const { signIn, signUp, signOut, useSession } = authClient;
