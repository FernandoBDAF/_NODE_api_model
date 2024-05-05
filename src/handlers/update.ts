import {prisma} from '../db';

export const getUpdate = async (req, res) => {
    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id
        }
    });

    res.json({data: update});
}

export const getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            userId: req.user.id
        },
        include: {
            updates: true
        }
    });
    const updates = products.flatMap(product => product.updates);
    res.json({data: updates});
}

export const createUpdate = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    });

    if (!product) {
        return res.status(404).json({error: "Product not found"});
    }

    const update = await prisma.update.create({
        data: req.body
    });

    res.json({data: update});
}

export const updateUpdate = async (req, res) => {
    const product = await prisma.product.findMany({
        where: {
            userId: req.body.productId
        },
        include: {
            updates: true
        }
    });

    const updates = product.flatMap(product => product.updates);

    const matchingUpdate = updates.find(update => update.id === req.params.id);

    if (!matchingUpdate) {
        return res.status(404).json({error: "Update not found"});
    }

    const updated = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    });

    res.json({data: updated});
}

export const deleteUpdate = async (req, res) => {
    const product = await prisma.product.findMany({
        where: {
            userId: req.body.productId
        },
        include: {
            updates: true
        }
    });

    const updates = product.flatMap(product => product.updates);

    const matchingUpdate = updates.find(update => update.id === req.params.id);

    if (!matchingUpdate) {
        return res.status(404).json({error: "Update not found"});
    }
    
    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    });

    res.json({data: deleted});
}
