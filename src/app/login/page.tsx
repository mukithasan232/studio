"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { signInWithCustomToken, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { signUpWithEmail, signInWithEmail } from '../auth/actions';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleSignIn = async (data: FormData) => {
      if (!auth) return;
      setIsLoading(true);
      try {
          await signInWithEmailAndPassword(auth, data.email, data.password);
          
          const formData = new FormData();
          formData.append('email', data.email);
          
          const serverResponse = await signInWithEmail(formData);
          
          if (serverResponse.success && serverResponse.idToken) {
              await signInWithCustomToken(auth, serverResponse.idToken);
          } else {
            throw new Error(serverResponse.error || "Server-side sign in failed.");
          }

          toast({ title: 'Success', description: 'Logged in successfully!' });
          router.push('/admin');
      } catch (error: any) {
          toast({
              title: 'Sign In Failed',
              description: error.message,
              variant: 'destructive',
          });
      } finally {
          setIsLoading(false);
      }
  };

  const handleSignUp = async (data: FormData) => {
      if (!auth) return;
      setIsLoading(true);
      try {
          // First, create the user on the client to get immediate feedback
          await createUserWithEmailAndPassword(auth, data.email, data.password);
          
          // Then, hit our server action to persist in Firebase Admin if needed
          const formData = new FormData();
          formData.append('email', data.email);
          formData.append('password', data.password);
          const serverResponse = await signUpWithEmail(formData);

          if (!serverResponse.success) {
            throw new Error(serverResponse.error || "Server-side sign up failed.");
          }

          toast({ title: 'Success', description: 'Account created successfully! Please sign in.' });
          // You might want to switch to the sign-in tab automatically here
          // For now, the user can click it.
      } catch (error: any) {
          toast({
              title: 'Sign Up Failed',
              description: error.message,
              variant: 'destructive',
          });
      } finally {
          setIsLoading(false);
      }
  };


  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Sign In</TabsTrigger>
          <TabsTrigger value="password">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Access your admin dashboard by signing into your account.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(handleSignIn)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signin">Email</Label>
                  <Input id="email-signin" type="email" placeholder="m@example.com" {...register('email')} />
                  {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signin">Password</Label>
                  <Input id="password-signin" type="password" {...register('password')} />
                   {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Create a new account to get started.
              </CardDescription>
            </CardHeader>
             <form onSubmit={handleSubmit(handleSignUp)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input id="email-signup" type="email" placeholder="m@example.com" {...register('email')} />
                  {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <Input id="password-signup" type="password" {...register('password')} />
                   {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
                </div>
              </CardContent>
              <CardFooter>
                 <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign Up
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
