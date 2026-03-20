const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); 
app.use(express.json()); 

// 内存数据库：存储所有阵容
let savedTactics = []; 

// 1. 获取所有阵容
app.get('/api/history', (req, res) => {
  res.status(200).json(savedTactics);
});

// 2. 保存新阵容
app.post('/api/save-tactic', (req, res) => {
  const newTactic = {
    id: Date.now(), // 唯一ID
    tacticName: req.body.tacticName || "未命名战术",
    timestamp: new Date().toLocaleString(),
    players: req.body.players
  };
  savedTactics.push(newTactic);
  res.status(200).json({ message: '保存成功' });
});

// 3. 删除阵容
app.delete('/api/delete-tactic/:id', (req, res) => {
  const { id } = req.params;
  savedTactics = savedTactics.filter(t => t.id.toString() !== id.toString());
  res.status(200).json({ message: '删除成功' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ 后端已启动: http://localhost:${PORT}`);
});