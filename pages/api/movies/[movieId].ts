import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/lib/primsadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method !== 'GET'){
        return res.status(405).end();
    }   

    try {
       await serverAuth(req);

       let  { movieId } = req.body;
        movieId = movieId || '6658da2ac9d9a88181354274'

       if(typeof movieId !== 'string'){
        throw new Error('Invalid ID');
       }

       if(!movieId){
        throw new Error('Invalid ID');
       }

       const movie = await prismadb.movie.findUnique({
        where: {
            id: movieId,
        }
       });

       if(!movieId){
        throw new Error('Invalid ID');
       }

       return res.status(200).json(movie);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}