const fs = require("fs");

exports.delete_file = async (path) => {
  try {
    fs.unlink(path, () => {});
  } catch (err) {
    return true;
  }
};
