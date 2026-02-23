import { Request, Response } from "express";
import supabase from "../../utils/supabase";
import bcrypt from "bcrypt";

// Example of how to use: http://localhost:8080/api/users/login?username=admin&password=test_123&hwid=test_hwid_id
export const auth_login = async (req: Request, res: Response) => {
  const userName = req.query.username as string;
  const userPassword = req.query.password as string;
  const userHwid = req.query.hwid as string;

  if (!userName || !userPassword || !userHwid) {
    console.log("[-] Auth Login Failed: Missing fields!");
    return res.status(401).send("Missing login fields!");
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", userName)
    .eq("hwid", userHwid)
    .single();

  if (error || !data) {
    console.log("[-] Auth Login Failed: User not found!");
    return res.status(401).send("Username, Password or Hwid is wrong");
  }
  console.log(data)
  const validPassword = await bcrypt.compare(userPassword, data.password);

  if (!validPassword) {
    console.log("[-] Auth Login Failed: Wrong password!");
    return res.status(401).send("Username, Password or Hwid is wrong");
  }

  return res.status(200).send("Logged in");
};


// How to use: http://localhost:8080/api/users/signup?username=test&password=123
export const auth_signup = async (req: Request, res: Response) => {
  try {
    const userName = req.query.username as string;
    const userPassword = req.query.password as string;

    if (!userName || !userPassword) {
      return res.status(400).send("Username or password not found!");
    }

    const salt = await bcrypt.genSalt(10);
    const userPasswordHashed = await bcrypt.hash(userPassword, salt);

    const { error } = await supabase
      .from('users')
      .insert({
        username: userName.trim(),
        password: userPasswordHashed,
      });

    if (error) {
      console.error("Signup error:", error.message);
      return res.status(500).send("Database error");
    }

    return res.status(201).send("User created successfully");
  } catch (err) {
    console.error("Unexpected signup error:", err);
    return res.status(500).send("Internal server error");
  }
};