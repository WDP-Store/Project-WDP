import Contact from "../model/Contact.js";
const findAllContacts = async (req, res) => {
    try {
      const { page } = req.query;
      const perPage = 10; // Adjust the number of contacts per page as needed
  
      const pageNumber = parseInt(page, 10) || 1;
      const totalCount = await Contact.countDocuments();
      const totalPages = Math.ceil(totalCount / perPage);
  
      const contacts = await Contact.find({})
        .sort({ createdAt: 'desc' })
        .skip((pageNumber - 1) * perPage)
        .limit(perPage);
  
      res.status(200).json({
        contacts,
        currentPage: pageNumber,
        totalPages
      });
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
