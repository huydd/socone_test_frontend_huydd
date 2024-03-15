module.exports = async () => {
  return {
    verbose: true,
    testEnvironment: "jsdom",
    testMatch: ["**/*.test.tsx", "**/*.integration.test.tsx"],
  };
};
