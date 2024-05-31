import React, { useCallback, useState } from "react";

import axios from 'axios';
import Input from "@/components/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Auth = () => {
    // const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('login');

    const toggleValue = useCallback(() => {
        setVariant((currVariant) => currVariant === 'login' ? 'register' : 'login');
    }, []);

    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email,
                password,
                // redirect: false,
                callbackUrl: '/profiles'
                // callbackUrl: '/'
            });

            // router.push('/');
        }
        catch (err) {
            console.log(err)
        }
    }, [email, password]);
    // }, [email, password, router]);

    const register = useCallback(async () => {
        try {
            await axios.post('./api/register', {
                email,
                name,
                password
            })
            login();
        } catch (err) {
            console.log("Error", err)
        }
    }, [email, name, password, login]);

    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpeg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="images/logo.png" alt="logo" className="h-12 " />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h1 className="text-white text-4xl mb-8 font-semibold">
                            {variant === 'login' ? "Sign in" : "Register"}
                        </h1>
                        <div className="flex flex-col gap-4">
                            {variant !== 'login' && <Input id="name" label="Username" value={name} onChange={(ev: any) => setName(ev.target.value)} />}
                            <Input id="email" type="email" label="Email" value={email} onChange={(ev: any) => setEmail(ev.target.value)} />
                            <Input id="password" type="password" label="Password" value={password} onChange={(ev: any) => setPassword(ev.target.value)} />
                        </div>
                        <button onClick={variant === 'login' ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {variant === 'login' ? "Login" : "Sign up"}
                        </button>
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div
                                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                                className="
                                    w-10
                                    h-10
                                    bg-white
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    cursor-pointer
                                    hover: opacity-80
                                    transition"
                            >
                                <FcGoogle size={30} />
                            </div>
                            <div
                                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                                className="
                                    w-10
                                    h-10
                                    bg-white
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    cursor-pointer
                                    hover: opacity-80
                                    transition"
                            >
                                <FaGithub size={30} />
                            </div>
                        </div>
                        <p className="text-neutral-500 mt-12">
                            {variant === 'login' ? "First time using Netflix?" : "Already have an account?"}
                            <span onClick={toggleValue} className="text-white ml-1 hover:underline cursor-pointer">
                                {variant === 'login' ? "Create an account" : "Login"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;