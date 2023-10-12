import { User } from "../../../../classes/User";

const userInfo: User[] = [
    
    {
    id: "1",
    username: "lojiper",
    password: "123",
    email:"",
    age: "",
    gender: "Erkek",
    birthday: ""
    },

]

export async function GET() {
    return new Response(JSON.stringify(userInfo));
}

export async function POST(req: any , res: any) {
  
    userInfo.push( req.body)
    return new Response(JSON.stringify(userInfo));
}