import express from "express"
const router = express.Router()
import db from "../models/index"
import { verifyUser } from "../middleware/auth"
const { MonthEvent, User, PDF, Study } = db


// Map string names to actual Sequelize models
const models = {
  User: User,
  MonthEvent: MonthEvent,
  PDF: PDF,
  Study: Study
};

router.get('/test-db-query', verifyUser, async (req, res) => {
  const { model: modelName, method, id, limit, whereField, whereValue } = req.query;

  if (!modelName || !models[modelName]) {
    return res.status(400).json({ error: 'Invalid or missing model name.' });
  }
  if (!method) {
    return res.status(400).json({ error: 'Missing query method (e.g., findAll, findOne).' });
  }

  const Model = models[modelName];
  let queryOptions = {};

  if (limit) {
    queryOptions.limit = parseInt(limit, 10);
  }
  if (whereField && whereValue) {
    // Basic where clause for demonstration. Be careful with user input here.
    queryOptions.where = {
      [whereField]: whereValue
    };
  }
  if (id) {
    // For findByPk, you usually pass the ID directly, not as part of options
    queryOptions.id = parseInt(id, 10);
  }

  const start = process.hrtime.bigint(); // High-resolution timer

  let result;
  let success = true;
  let errorMessage = null;

  try {
    switch (method) {
      case 'findAll':
        result = await Model.findAll(queryOptions);
        break;
      case 'findOne':
        result = await Model.findOne(queryOptions);
        break;
      case 'findByPk': // Find by Primary Key
        if (!id) {
          throw new Error("Missing 'id' for findByPk method.");
        }
        result = await Model.findByPk(queryOptions.id);
        break;
      // Add more Sequelize methods as needed (e.g., findAndCountAll, count)
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  } catch (error) {
    success = false;
    errorMessage = error.message;
    console.error(`DB Query Test Error for ${modelName}.${method}:`, error);
  }

  const end = process.hrtime.bigint();
  const durationMs = Number(end - start) / 1_000_000; // Convert nanoseconds to milliseconds

  if (success) {
    res.json({
      success: true,
      model: modelName,
      method: method,
      queryTimeMs: durationMs.toFixed(2),
      recordCount: Array.isArray(result) ? result.length : (result ? 1 : 0),
      // Optionally return a subset of data or just confirmation
      message: `Query for ${modelName}.${method} completed in ${durationMs.toFixed(2)} ms.`
    });
  } else {
    res.status(500).json({
      success: false,
      model: modelName,
      method: method,
      queryTimeMs: durationMs.toFixed(2), // Still include time for failed queries
      error: errorMessage,
      message: `Query for ${modelName}.${method} failed.`
    });
  }
});

module.exports = router;

export default router