const DEFAULT_RANGE = [0.45, 0.55];

const obfuscateNumber = (int, range = DEFAULT_RANGE) => {
    const [min, max] = range;
    // [0..1] -> [0,45..0.55] / +0.45
    // [1..2]
    return Math.floor(int * (Math.random() * (max - min) + min));
};

module.exports = {
  obfuscateNumber,
};
