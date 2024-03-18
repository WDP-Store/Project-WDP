import Status from "../model/Status.js";

const getAll = async (req, res) => {
  try {
    const status = await Status.find();

    return status;
  } catch (error) {
    console.log(error);
    throw new Error(`Get all failed: ${error}`);
  }
};

export default {
  getAll,
};
