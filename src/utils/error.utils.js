 function AppError(msg, code = 500) {
  const err = new Error(msg);
  err.statusCode = code;
  throw err;
}

export default AppError