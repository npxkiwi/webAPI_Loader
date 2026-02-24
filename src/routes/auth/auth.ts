import { Request, Response } from "express";
import supabase from "../../utils/supabase";
import bcrypt from "bcrypt";

// Example of how to use: http://localhost:8080/api/users/login?username=admin&password=test_123&hwid=test_hwid_id
export const auth_login = async (req: Request, res: Response) => {
  try {
    const userName = req.query.username as string;
    const userPassword = req.query.password as string;
    const userHWID = req.query.hwid as string;

    if (!userName || !userPassword || !userHWID) {
      return res
        .status(401)
        .json({ message: "Username or password not found!" });
    }

    const { error, data } = await supabase
      .from("users")
      .select("*")
      .eq("username", userName)
      .eq("hwid", userHWID)
      .single();

    if (error || !data) {
      console.log("[-] Auth Login Failed: User not found!");
      return res.status(401).json({ message: "Wrong Username or Password!" });
    }

    const validPassword = await bcrypt.compare(userPassword, data.password);

    if (!validPassword) {
      console.log("[-] Auth Login Failed: Wrong password!");
      return res.status(401).json({ message: "Wrong Username or Password!" });
    }

    return res.status(200).json({ message: "Successfull" });
  } catch (error) {
    console.error("Unexpected login error:", error);
    return res.status(401).json({ message: "Internal server error" });
  }
};

// How to use: http://localhost:8080/api/users/signup?username=test&password=123
export const auth_signup = async (req: Request, res: Response) => {
  try {
    const userName = req.query.username as string;
    const userPassword = req.query.password as string;

    if (!userName || !userPassword) {
      return res.status(401).send("Username or password not found!");
    }

    const salt = await bcrypt.genSalt(10);
    const userPasswordHashed = await bcrypt.hash(userPassword, salt);

    const { error } = await supabase.from("users").insert({
      username: userName.trim(),
      password: userPasswordHashed,
    });

    if (error) {
      console.error("Signup error:", error.message);
      return res.status(4001).send("Database error");
    }

    return res.status(201).send("User created successfully");
  } catch (err) {
    console.error("Unexpected signup error:", err);
    return res.status(401).send("Internal server error");
  }
};
