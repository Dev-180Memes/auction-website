import React from 'react'
import { useRouter } from 'next/router';
import { toast, Toaster } from 'react-hot-toast';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
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
    <>
        <Toaster />
        <main className="relative">
            <Navbar />
            <section className="padding-x sm:py-32 py-16 w-full">
                <div className="max-container flex justify-between items-center max-lg:flex-col gap-10">
                    <div>
                        <h3 className="text-4xl leading-[68px] lg:max-w-md font-palanquin font-bold">
                            Login to your
                            <span className="text-coral-red"> Account</span>
                        </h3>
                        <p>
                            Don&apos;t have an account {" "}
                            <Link href={'/signup'} className='underline'>Create Account</Link>
                        </p>
                    </div>
                    <div className="lg:max-w-[40%] w-full flex flex-col items-center max-sm:flex-col gap-5 p-2.5">
                        <div className='flex flex-col'>
                            <label htmlFor="email">Email Address</label>
                            <input type="email" className="sm:border sm:border-slate-gray rounded-xl" placeholder='user@auction.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="email">Password</label>
                            <input type="password" className="sm:border sm:border-slate-gray rounded-xl" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='flex max-sm:justify-end items-center max-sm:w-full'>
                            <Button label='Login' fullWidth onClick={handleLogin} />
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-black padding-x padding-t pb-8">
                <Footer />
            </section>
        </main>
    </>
  )
}

export default Login;