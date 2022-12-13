import { prisma } from "../prisma"

export default async function getUser() {
    const user = await prisma.seller.findUnique({
        where:{
            name: "a"
        },
        select: {
            name: true,
            sells: {
                select: {
                    selled:true,
                    manager: true,
                    buyer: true,
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

    return {user}
}