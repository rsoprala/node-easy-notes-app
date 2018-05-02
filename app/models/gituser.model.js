const mongoose = require('mongoose');

const GitUserSchema = mongoose.Schema({
  id: String,
  name: String,
  public_repos: String,
  repos_url: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);