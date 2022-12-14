import { prisma } from "../../lib/prisma"
import { NextRequest, NextResponse } from "next/server";

export default async function del(req: NextRequest, res: NextResponse) {

    const {id} = JSON.parse(req.body);

    const delete_car = await prisma.car.deleteMany({
        where: {
            sellId: Number(id),
        },
    })

    const delete_sell = await prisma.sell.delete({
        where: {
            id: Number(id),
        },
    })

    res.status(200).send({res: "ok"})
}