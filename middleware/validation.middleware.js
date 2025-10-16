export const validate = (validatorFn) => (req, res, next) => {
try {
validatorFn(req);
next();
} catch (err) {
err.status = err.status || 400;
next(err);
}
};