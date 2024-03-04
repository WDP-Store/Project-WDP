import { contactRepository } from '../repositories/index.js';

const findAllContacts = async (req, res) => {
  try {
    const data = await contactRepository.findAllContacts(req, res);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

const findContactById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await contactRepository.findContactById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

const createContact = async (req, res) => {
  try {
    const contact = req.body;
    const data = await contactRepository.createContact(contact);
    console.log(data)
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

const updateContact = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = req.body;
    const data = await contactRepository.updateContact(id, contact);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

const deleteContact = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await contactRepository.deleteContact(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

export default {
  findAllContacts,
  findContactById,
  createContact,
  updateContact,
  deleteContact,
};
