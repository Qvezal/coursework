import { prisma } from "../../lib/prisma"
import { NextRequest, NextResponse } from "next/server";

export default async function update(req: NextRequest, res: NextResponse) {

    const {id,edit_sell} = JSON.parse(req.body);

    const update_car = await prisma.car.update({
        where: {
            sellId: Number(id),
        },
        data: {
            car_name: edit_sell.car_name,
            owner: edit_sell.car_owner,
        }
    })

    const update_sell = await prisma.sell.update({
        where: {
            id: Number(id),
        },
        data: {
            selled: edit_sell.selled == "No" ? false : true,
            manager: edit_sell.manager,
            buyer: edit_sell.buyer,
        }
    })

    res.status(200).send({res: "ok"})
}