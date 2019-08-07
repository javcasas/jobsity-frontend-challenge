module.exports = {
    "roots": [
        "<rootDir>/src",
    ],
    "moduleDirectories": [
        "node_modules",
        "src",
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest",
    },
    "moduleNameMapper": {
        "^.+\\.css$": "<rootDir>/__mocks__/styleMock.js"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node",
        "css"
    ],
    "testEnvironment": "node",

    // Setup Enzyme
    "snapshotSerializers": ["enzyme-to-json/serializer"],
    "setupFilesAfterEnv": ["<rootDir>/src/setupEnzyme.ts"],
}
