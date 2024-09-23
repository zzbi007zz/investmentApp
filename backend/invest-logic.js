const OpenAI = require("openai");
const dotenv = require("dotenv");
const readline = require("readline");
const fs = require('fs');

dotenv.config({ override: true });

const openai = new OpenAI({
    apikey: process.env.OPENAI_API_KEY,
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}




async function getCompletion(prompt) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "user", content: prompt },

        ],
    });
    return completion.choices[0].message.content;
}


function readPromptFile(filename) {
    try {
        return fs.readFileSync(filename, 'utf8');
    } catch (error) {
        console.error('Error reading file ${filename}:', error);
        return null;

    }

}

async function processPrompts(monthlyIncome, monthlyExpenses, investmentVision) {
    const prompt1 = readPromptFile('prompt1.txt');
    if (!prompt1) return;

    const filledPrompt1 = prompt1.replace("<<income>>", monthlyIncome)
        .replace("<<expenses>>", monthlyExpenses);

    const result1 = await getCompletion(filledPrompt1);

    const prompt2 = readPromptFile('prompt2.txt');
    if (!prompt2) return;

    const filledPrompt2 = prompt2.replace("<<user_funds>>", result1)
        .replace("<<investment_vision>>", investmentVision);

    const result2 = await getCompletion(filledPrompt2);

    const prompt3 = readPromptFile('prompt3.txt');
    if (!prompt3) return;

    const filledPrompt3 = prompt3.replace("<<user_portfolio_strategy>>", result2);

    const result3 = await getCompletion(filledPrompt3);
    
    // Return result3 as a string without parsing
    return result3;
}


module.exports = { processPrompts };

processPrompts()
    //.then(results => console. Log("Final Results:", results))
    .catch(error => console.error("Error:", error));