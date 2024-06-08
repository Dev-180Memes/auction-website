import React, { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

const Signup = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const router = useRouter();

    const handleSignup = async () => {
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
    <>
        <Toaster />
        <main className="relative">
            <Navbar />
            <section className="padding-x sm:py-32 p-16 w-full">
                <div className="max-container flex justify-between items-center max-lg:flex-col gap-10">
                    <div>
                        <h3 className="text-4xl leading-[68px] lg:max-w-md font-palanquin font-bold">
                            Create a new
                            <span className="text-coral-red"> Account</span>
                        </h3>
                        <p>
                            Already have an account{" "}
                            <Link href={'/login'} className='underline'>Login</Link>
                        </p>
                    </div>
                    <div className="lg:max-w-[40%] w-full flex flex-col items-center max-sm:flex-col gap-5 p-2.5">
                        <div className="flex flex-col">
                            <label htmlFor="email">Email Address</label>
                            <input 
                                type="email"
                                className='sm:border sm:border-slate-gray rounded-xl'
                                placeholder='user@auction.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="username">Username</label>
                            <input
                                type='text'
                                className='sm:border sm:border-slate-gray rounded-xl'
                                placeholder='Username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password">Password</label>
                            <input
                                type='password'
                                className='sm:border sm:border-slate-gray rounded-xl'
                                placeholder='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password2">Confirm Password</label>
                            <input
                                type='password'
                                className='sm:border sm:border-slate-gray rounded-xl'
                                placeholder='confirm password'
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                            />
                        </div>
                        <div className="flex max-sm:justify-end items-center max-sm:w-full">
                            <Button label='Signup' fullWidth onClick={handleSignup} />
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

export default Signup;