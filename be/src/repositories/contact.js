import Contact from "../model/Contact.js";
const findAllContacts = async (req, res) => {
  try {
    const { page, email, status } = req.query;
    const query = {};
    if (status) query.status = status;
    if (email) query.email = { $regex: email, $options: "i" };

    const data = await Contact.paginate(query, {
      page: page || 1,
      limit: 10,
      sort: {
        createdAt: "desc",
      },
    });

    return data;
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

const findContactById = async (id) => {
  try {
    const result = await Contact.findById(id);
    return result;
  } catch (error) {
    console.error("Error while finding a contact:", error);
    throw new Error("Couldn't find the contact: " + error);
  }
};

const createContact = async (contactData) => {
  try {
    const result = await Contact.create(contactData);
    return result;
  } catch (error) {
    console.error("Error while creating a contact:", error);
    throw new Error("Couldn't create the contact: " + error);
  }
};

const updateContact = async (id, contactData) => {
  try {
    const result = await Contact.findByIdAndUpdate(id, contactData);
    return result;
  } catch (error) {
    console.error("Error while updating a contact:", error);
    throw new Error("Couldn't update the contact: " + error);
  }
};

const deleteContact = async (id) => {
  try {
    const result = await Contact.findByIdAndDelete(id);
    return result;
  } catch (error) {
    console.error("Error while deleting a contact:", error);
    throw new Error("Couldn't delete the contact: " + error);
  }
};

export default {
  findAllContacts,
  findContactById,
  createContact,
  updateContact,
  deleteContact,
};
