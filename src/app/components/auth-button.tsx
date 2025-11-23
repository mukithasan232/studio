"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-provider';
import { User, LogIn } from 'lucide-react';

export default function AuthButton() {
    const { user, handleLogout } = useAuth();

    return (
        <>
            {user ? (
                <div className="flex items-center gap-2">
                    <span className='text-sm text-muted-foreground hidden sm:inline-block'>{user.email}</span>
                    <Button variant="ghost" size="icon" onClick={handleLogout}>
                        <User className="h-6 w-6" />
                    </Button>
                </div>
            ) : (
                <Button asChild variant="ghost" size="icon">
                    <Link href="/login">
                        <LogIn className="h-6 w-6" />
                    </Link>
                </Button>
            )}
        </>
    );
}
