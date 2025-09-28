import { Router } from "express"
import { UserRoutes } from "../modules/user/user.route"
import { AgreementRoutes } from "../modules/agreement/agreement.route"
import { PurchaseRoutes } from "../modules/purchase/purchase.route"

export const router = Router()
const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/agreement",
        route: AgreementRoutes,
    },
    {
        path: "/purchase",
        route: PurchaseRoutes
    }
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})