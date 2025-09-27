import express from 'express';
import Issue from '../models/Issue';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware);

// GET /api/issues - List with filters and pagination
router.get('/', async (req: AuthRequest, res) => {
  try {
    const { page = 1, limit = 10, status, priority, search } = req.query;
    const filter: any = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const issues = await Issue.find(filter)
      .populate('createdBy', 'email')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Issue.countDocuments(filter);

    res.json({
      issues,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/issues - Create issue
router.post('/', async (req: AuthRequest, res) => {
  try {
    const issue = new Issue({
      ...req.body,
      createdBy: req.userId
    });
    await issue.save();
    await issue.populate('createdBy', 'email');
    res.status(201).json(issue);
  } catch (error) {
    res.status(400).json({ error: 'Validation error' });
  }
});

// GET /api/issues/:id - Get single issue
router.get('/:id', async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id).populate('createdBy', 'email');
    if (!issue) return res.status(404).json({ error: 'Issue not found' });
    res.json(issue);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/issues/:id - Update issue
router.put('/:id', async (req, res) => {
  try {
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'email');
    
    if (!issue) return res.status(404).json({ error: 'Issue not found' });
    res.json(issue);
  } catch (error) {
    res.status(400).json({ error: 'Validation error' });
  }
});

// DELETE /api/issues/:id - Delete issue
router.delete('/:id', async (req, res) => {
  try {
    const issue = await Issue.findByIdAndDelete(req.params.id);
    if (!issue) return res.status(404).json({ error: 'Issue not found' });
    res.json({ message: 'Issue deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;