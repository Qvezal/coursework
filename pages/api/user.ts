import { prisma } from "../../lib/prisma"
import { NextRequest, NextResponse } from "next/server";

export default async function getUser(req: NextRequest, res: NextResponse) {

    const name = req.body

    const user = await prisma.seller.findUnique({
        where:{
            name: name
        },
        select: {
            id: true,
            name: true,
            sells: {
                select: {
                    id: true,
                    selled:true,
                    buyer: true,
                    manager: true,
                    Car: {
                        select: {
                            car_name:true,
                            owner:true
                        }
                    }
                }
            }
        }
            
    })

    res.status(200).send(user);
}