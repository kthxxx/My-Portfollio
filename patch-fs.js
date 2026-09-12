const fs = require("fs");

function fixError(err, path) {
  if (err && (err.code === "EISDIR" || err.code === "UNKNOWN" || err.code === "EPERM")) {
    try {
      const st = fs.lstatSync(path);
      if (!st.isSymbolicLink()) {
        const einval = new Error(`EINVAL: invalid argument, readlink '${path}'`);
        einval.code = "EINVAL";
        einval.errno = -4071;
        einval.syscall = "readlink";
        einval.path = path;
        return einval;
      }
    } catch (_) {
      // ignore
    }
  }
  return err;
}

const origReadlinkSync = fs.readlinkSync;
fs.readlinkSync = function (path, options) {
  try {
    return origReadlinkSync(path, options);
  } catch (err) {
    throw fixError(err, path);
  }
};

const origReadlink = fs.readlink;
fs.readlink = function (path, options, callback) {
  const cb = typeof options === "function" ? options : callback;
  const opt = typeof options === "function" ? undefined : options;
  return origReadlink(path, opt, (err, linkString) => {
    if (err) {
      return cb(fixError(err, path));
    }
    return cb(null, linkString);
  });
};

if (fs.promises && fs.promises.readlink) {
  const origPromisesReadlink = fs.promises.readlink;
  fs.promises.readlink = async function (path, options) {
    try {
      return await origPromisesReadlink(path, options);
    } catch (err) {
      throw fixError(err, path);
    }
  };
}
