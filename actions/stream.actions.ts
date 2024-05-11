'use server'   //used for private(example streamseckey and clerkseckey in env)

import { currentUser } from "@clerk/nextjs";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSec = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async()=>{
    const user = await currentUser();

    if(!user) throw new Error('User not logged in!!');
    if(!apiKey) throw new Error('No api key');
    if(!apiSec) throw new Error('No api secret');

    const client = new StreamClient(apiKey,apiSec);

    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    const issued = Math.floor(Date.now()/1000)-60;
    const token = client.createToken(user.id,exp,issued);

    return token;
}