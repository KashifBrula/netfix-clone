import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from "@/lib/primsadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            const { currentUser } = await serverAuth(req);

            const { movieId } = req.body;

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                }
            });
            console.log(existingMovie)
            if (!existingMovie) {
                throw new Error("Invalid ID");
            }

            const user = await prismadb.user.update({
                where: {
                    email: currentUser?.email || '',
                },
                data: {
                    favouriteIds: {
                        push: movieId,
                    }
                }
            });
            console.log(user)
            return res.status(200).json(user);
        }

        if(req.method === 'DELETE'){
            const { currentUser } = await serverAuth(req);

            const { movieId } = req.body;

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                }
            });

            if(!existingMovie){
                throw new Error("Invalid Id");
            }

            const updateFavourite = without(currentUser?.favouriteIds, movieId);

            const updateUser = await prismadb.user.update({
                where: {
                    email: currentUser?.email || '',
                },
                data: {
                    favouriteIds: updateFavourite,
                }
            });

            return res.status(200).json(updateUser);
        }

        return res.status(405).end();
    } catch (error) {
        console.log(error);
        return res.status(405).end();
    }

}