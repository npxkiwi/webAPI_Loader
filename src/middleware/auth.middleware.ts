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

export const checkExistingUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userName = req.query.username as string;

    if (!userName) {
      return res.status(400).send("Username not provided");
    }

    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('username', userName)
      .maybeSingle();

    if (error) {
      console.error("Check user error:", error.message);
      return res.status(500).send("Database error");
    }
    if (data) {
      return res.status(409).send("User already exists");
    }

    next();
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).send("Internal server error");
  }
};

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