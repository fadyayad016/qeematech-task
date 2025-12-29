const lessonService = require("../services/lessonService");

exports.getLessons = async (req, res, next) => {
  try {
    const result = await lessonService.getAllLessons(req.query);
    res.status(200).json({ 
        status: "success", 
        ...result 
    });
  } catch (error) {
    next(error);
  }
};

exports.createLesson = async (req, res, next) => {
  try {
    const { name, description, rating } = req.body;

    const lessonData = {
      name,
      description,
      rating: parseInt(rating),
      image: req.file ? `/uploads/${req.file.filename}` : null,
    };

    const lesson = await lessonService.createLesson(lessonData);
    res.status(201).json({ status: "success", data: { lesson } });
  } catch (error) {
    next(error);
  }
};
exports.updateLesson = async (req, res, next) => {
  try {
    const { name, description, rating } = req.body;

    const updateData = {
      name,
      description,
      rating: rating ? parseInt(rating) : undefined,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const lesson = await lessonService.updateLesson(req.params.id, updateData);
    res.status(200).json({ status: "success", data: { lesson } });
  } catch (error) {
    next(error);
  }
};

exports.deleteLesson = async (req, res, next) => {
  try {
    await lessonService.deleteLesson(req.params.id);
    res.status(204).json({ status: "success", data: null });
  } catch (error) {
    next(error);
  }
};
