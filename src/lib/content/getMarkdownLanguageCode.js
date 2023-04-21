const GIST_LANGUAGE_MAP = [
    { "JavaScript": "js" },
    { "TypeScript": "ts" },
    { "Python": "python" },
    { "Java": "java" },
    { "C++": "cpp" },
    { "C": "c" },
    { "Ruby": "ruby" },
    { "PHP": "php" },
    { "HTML": "html" },
    { "CSS": "css" },
    { "JSON": "json" },
    { "YAML": "yaml" },
    { "Markdown": "markdown" },
    { "SQL": "sql" },
    { "Shell": "shell" },
    { "Bash": "bash" }
]

const getMarkdownLanguageCode = (gistLanguage) => {
    const match = GIST_LANGUAGE_MAP.find(
        (entry) => Object.keys(entry)[0] === gistLanguage
    );
    return match ? match[gistLanguage] : "";
};

export default getMarkdownLanguageCode;