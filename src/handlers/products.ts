import { prisma } from "../db";

export const getProducts = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true
        }
    });
    res.json({data: user.products});
}

export const getProduct = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.params.id,
            userId: req.user.id
        }
    });

    if (!product) {
        res.status(404);
        res.json({message: "Product not found"});
        return;
    }

    res.json({data: product});
}

export const createProduct = async (req, res, next) => {
    try {
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                user: {
                    connect: {
                        id: req.user.id
                    }
                }
            }
        });
    
        res.json({data: product});
    } catch (e) {
        next(e);
    }
}

// export const updateProduct = async (req, res) => {
//     const updatd = await prisma.product.update({
//         where: {
//             id: req.params.id,
//             userId: req.user.id
//         },
//         data: {
//             name: req.body.name
//         }
//     });

//     res.json({data: updatd});
// }

export const updateProduct = async (req, res) => {
    const updatd = await prisma.product.update({
        where: {
            id_userId: {
                id: req.params.id,
                userId: req.user.id
            }
        },
        data: {
            name: req.body.name
        }
    });

    res.json({data: updatd});
}

// export const deleteProduct = async (req, res) => {
//     const deleted = await prisma.product.delete({
//         where: {
//             id: req.params.id,
//             userId: req.user.id
//         }
//     });

//     res.json({data: deleted});
// }

export const deleteProduct = async (req, res) => {
    const deleted = await prisma.product.delete({
        where: {
            id_userId: {
                id: req.params.id,
                userId: req.user.id
            }
        }
    });

    res.json({data: deleted});
}