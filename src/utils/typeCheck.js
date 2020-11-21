const isFunction = prospect => {
    if (typeof prospect !== "function")
        throw new Error(`${prospect} is not a function.`);
};

module.exports = {
    isFunction
};
