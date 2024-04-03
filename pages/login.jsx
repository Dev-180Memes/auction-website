import React from 'react'
import {
    Button,
    Label,
    TextInput
} from 'flowbite-react';
import { useRouter } from 'next/router';
import { toast, Toaster } from 'react-hot-toast';
import Link from 'next/link';

const Login = () => {
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email1.value;
        const password = e.target.password.value;
        const response = await fetch("/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem("token", data.token);
            toast.success("Login successful");
            router.push("/products");
        } else {
            toast.error(data.message);
        }
    }

  return (
    <div className="h-screen flex items-center justify-center">
        <Toaster />
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleLogin}>
        <div>
            <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
        </div>
        <div>
            <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput id="password" type="password" required />
        </div>
        <Button type="submit">Submit</Button>
        <p>
            Don&apos;t have an account {" "}
            <Link href={'/signup'} className='underline'>Create Account</Link>
        </p>
        </form>
    </div>
  )
}

export default Login;