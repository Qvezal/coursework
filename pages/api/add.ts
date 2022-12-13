import { prisma } from "../../lib/prisma"
import { NextRequest, NextResponse } from "next/server";

export default async function getUser(req: NextRequest, res: NextResponse) {

    const {id,new_sell} = JSON.parse(req.body);

    const sell = await prisma.sell.create({
        data: {
            sellerId: id,
            selled: new_sell.selled == "No" ? false : true,
            manager: new_sell.manager ? new_sell.manager : '-',
            buyer: new_sell.buyer ? new_sell.buyer : '-',
            Car: {
                create: {
                    car_name: new_sell.car_name,
                    owner: new_sell.car_owner
                }
            }
        }

    })

    res.status(200).send({res: "ok"})
}