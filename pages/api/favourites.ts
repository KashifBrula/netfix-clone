import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/primsadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "GET"){
        return res.status(405).end();
    }
    
    try {
        const { currentUser } = await serverAuth(req);

        const favouriteMovies = await prismadb.movie.findMany({
            where: {
                id: {
                    in: currentUser?.favouriteIds,
                }
            }
        })

        return res.status(200).json(favouriteMovies);
    } catch (error) {
        console.log(error);
        res.status(400).end()
    }
}