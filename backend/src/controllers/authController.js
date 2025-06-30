// controllers/crudController.js
function createCrudController(Model) {
  return {
    getAll: async (req, res) => {
      try {
        const items = await Model.find();
        res.json(items);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },

    getById: async (req, res) => {
      try {
        const item = await Model.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Non trouvé" });
        res.json(item);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },

    create: async (req, res) => {
      try {
        const newItem = new Model(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    },

    update: async (req, res) => {
      try {
        const updatedItem = await Model.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
        if (!updatedItem) return res.status(404).json({ message: "Non trouvé" });
        res.json(updatedItem);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    },

    delete: async (req, res) => {
      try {
        const deletedItem = await Model.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: "Non trouvé" });
        res.json({ message: "Supprimé avec succès" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },
  };
}

module.exports = createCrudController;
