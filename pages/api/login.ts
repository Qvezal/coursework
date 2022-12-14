import { prisma } from "../../lib/prisma"
import { NextRequest, NextResponse } from "next/server";

export default async function login(req: NextRequest, res: NextResponse) {

    const {name,password} = JSON.parse(req.body);

    const userExist = await prisma.seller.count({
        where:{
            name: name
        }
    })

    if (userExist != 0) {
        const user = await prisma.seller.findUnique({
            where:{
                name: name
            },
            select: {
                name: true,
                password: true
            }
                
        })
        if (user?.password == password) {
            res.status(200).send({res: "ok"})
        }
        else {
            res.status(200).send({res: "wrong password"})
        }
    } else {

        const new_user = await prisma.seller.create({
            data: {
                name: name,
                password: password,
                sells: {
                    create: {}
                }
            }
        })

        res.status(200).send({res: "ok"})
    }
}