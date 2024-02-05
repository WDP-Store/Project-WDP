import Product from "../model/Product.js";

const findAll = async (req, res) => {
    try {
        const { page, status, category, name } = req.query;
        console.log("page");
        console.log(page);
        console.log(status);
        console.log(typeof status == "boolean");
        console.log(category);
        console.log(name);
        const query = {};
        if (status !== undefined) query.status = status === 'true'; // Or whatever your boolean logic needs to be
        if (category) query.category = { $regex: category, $options: "i" };
        if (name) query.name = { $regex: name, $options: "i" };

        const test = await Product.paginate(
            {
                // status: { $regex: status, $options: "i" },
                // category: { $regex: category, $options: "i" },
                // status: undefined,
                // year: 2022,
                // price: { $gte: 1099.99, $lte: 1999 },
                name: { $regex: name, $options: "i" },
            },
            {
                page: page || 1,
                limit: 2,
                sort: {
                    createdAt: "desc",
                },
            }
        );
        return test;
    } catch (error) {
        console.log(error);
    }
};

const findOne = async (id) => {
    try {
        const result = await Product.findById(id).populate('category');

        return result;
    } catch (error) {
        console.log(error)
        throw new Error("Couldn't findOne: " + error);
    }
}

const create = async (product) => {
    try {
        const result = await Product.create(product);

        return result;
    } catch (error) {
        console.log(error)
        throw new Error("Couldn't create: " + error);
    }
}

const update = async (id, product) => {
    try {
        const result = await Product.findByIdAndUpdate(id, product);

        return result;
    } catch (error) {
        console.log(error)
        throw new Error("Couldn't update: " + error);
    }
}

const deleteProduct = async (id) => {
    try {
        const result = await Product.findByIdAndDelete(id).populate('category');

        return result;
    } catch (error) {
        console.log(error)
        throw new Error("Couldn't delete: " + error);
    }
}

export default {
    create,
    findAll,
    findOne,
    update,
    deleteProduct,
}