import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/lib/primsadb';
import serverAuth from "@/lib/serverAuth";

export default async function hanlder( req: NextApiRequest, res: NextApiResponse) {
    if( req.method !== "GET" ) {
        return res.status(405).end();
    }

    try{
        await serverAuth(req);

        const movieCount = await prismadb.movie.count();
        const randomIndex = Math.floor(Math.random() * movieCount);

        const randomMovies = await prismadb.movie.findMany({
            take: 1,
            skip: randomIndex
        })

        return res.status(200).json(randomMovies?.[0]);
    }
    catch (error) {
        console.log(error);
        return res.status(400).end();
    }
    
}