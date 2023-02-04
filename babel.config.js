module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      "inline-dotenv",
      [
        "babel-plugin-root-import",
        {
          paths: [
            {
              root: __dirname,
              rootPathPrefix: "@cook/",
              rootPathSuffix: "src",
            },
          ],
        },
      ],
    ],
  };
};
