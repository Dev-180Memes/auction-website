import React from 'react'
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import {
    Button,
    Label,
    TextInput
} from 'flowbite-react';
import Link from 'next/link';

const Signup = () => {
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        const email = e.target.email1.value;
        const username = e.target.username.value;
        const password = e.target.password.value;
        const password2 = e.target.password2.value;
        if (password !== password2) {
            toast.error("Passwords do not match");
            return;
        }
        const response = await fetch("/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, username, password }),
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem("token", data.token);
            toast.success("Signup successful");
            router.push("/products");
        } else {
            toast.error(data.message);
        }
    }

  return (
    <div className="h-screen flex items-center justify-center">
        <Toaster />
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSignup}>
        <div>
            <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput id="email1" type="email" placeholder="name@auction.com" required />
        </div>
        <div>
            <div className="mb-2 block">
            <Label htmlFor="username" value="Username" />
            </div>
            <TextInput id="username" type="username" placeholder="Username" required />
        </div>
        <div>
            <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
            </div>
            <TextInput id="password" type="password" placeholder="Password" required />
        </div>
        <div>
            <div className="mb-2 block">
            <Label htmlFor="password2" value="Confirm Password" />
            </div>
            <TextInput id="password2" type="password" placeholder="Confirm Password" required />
        </div>
        <Button type="submit">Submit</Button>
        <p>
            Already have an account {" "}
            <Link href={'/login'} className='underline'>Login</Link>
        </p>
        </form>
    </div>
  )
}

export default Signup;