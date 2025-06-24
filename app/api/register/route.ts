import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function POST(req:Request){
  const {name,email, password} = await req.json();
  await connectToDatabase();

  const exsistingUser = await User.findOne({email});
  if(exsistingUser) return new Response("user exist", {status:400});

  await User.create({name,email, password});
  return new Response("User created", {status:201});

}
