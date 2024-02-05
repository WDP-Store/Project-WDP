import Product from "../model/product.js";

const findAll = async () => {
    try {
        // const result = await Product.find().populate('category');  
        const result = await Product.find().skip(1).limit(1);
        return result;
    } catch (error) {
        console.log(error)
        throw new Error("Couldn't findAll: " + error);
    }
}

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