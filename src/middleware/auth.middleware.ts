import {Request, Response, NextFunction, response} from "express";
import supabase from "../utils/supabase";

// Check if the user exists!
export const checkUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const userName = req.query.username as string;

    const {data} = await supabase.from('users').select('*').eq('username', userName);

    if (!data || data.length === 0) {
        return res.status(401).send("User was not found!");
    }

    next();
}
// Check if the user is banned!
export const checkBanned = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    const username = req.query.username as string;

    const { data } = await supabase
        .from("users")
        .select("banned, banned_reason")
        .eq("username", username)
        .single();

    if (data?.banned) {
        return res.status(401).send(data?.banned_reason);
    }

    next();
};
