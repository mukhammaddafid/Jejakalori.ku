'use server';
/**
 * @fileOverview Generates a narrative summary of the user's daily food intake and provides personalized suggestions for the next day.
 *
 * - generateDailySummaryAndSuggestions - A function that handles the daily summary and suggestion generation process.
 * - DailySummaryAndSuggestionsInput - The input type for the generateDailySummaryAndSuggestions function.
 * - DailySummaryAndSuggestionsOutput - The return type for the generateDailySummaryAndSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DailySummaryAndSuggestionsInputSchema = z.object({
  dailyFoodIntake: z.string().describe('A detailed summary of the user\'s food intake for the day, including meals and snacks.'),
  calorieGoal: z.number().describe('The user\'s daily calorie goal.'),
  proteinGoal: z.number().describe('The user\'s daily protein goal in grams.'),
  carbGoal: z.number().describe('The user\'s daily carbohydrate goal in grams.'),
  fatGoal: z.number().describe('The user\'s daily fat goal in grams.'),
  currentWeight: z.number().describe('The user\'s current weight in kilograms.'),
  activityLevel: z.string().describe('The user\'s activity level (e.g., sedentary, lightly active, moderately active, very active, extra active).'),
});
export type DailySummaryAndSuggestionsInput = z.infer<typeof DailySummaryAndSuggestionsInputSchema>;

const DailySummaryAndSuggestionsOutputSchema = z.object({
  summary: z.string().describe('A narrative summary of the user\'s daily food intake.'),
  suggestions: z.string().describe('Personalized suggestions for the next day to improve the user\'s diet and help them achieve their goals.'),
});
export type DailySummaryAndSuggestionsOutput = z.infer<typeof DailySummaryAndSuggestionsOutputSchema>;

export async function generateDailySummaryAndSuggestions(input: DailySummaryAndSuggestionsInput): Promise<DailySummaryAndSuggestionsOutput> {
  return generateDailySummaryAndSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dailySummaryAndSuggestionsPrompt',
  input: {schema: DailySummaryAndSuggestionsInputSchema},
  output: {schema: DailySummaryAndSuggestionsOutputSchema},
  prompt: `You are a nutritionist providing a daily summary and suggestions to a user based on their food intake and goals.\n\n  Here is the user's daily food intake:\n  {{dailyFoodIntake}}\n\n  Here are the user's goals:\n  - Calorie Goal: {{calorieGoal}} calories\n  - Protein Goal: {{proteinGoal}} grams\n  - Carb Goal: {{carbGoal}} grams\n  - Fat Goal: {{fatGoal}} grams\n\n  Here is the user's current weight: {{currentWeight}} kg\n  Here is the user's activity level: {{activityLevel}}\n\n  Create a narrative summary of the user's daily food intake and provide personalized suggestions for the next day to improve their diet and help them achieve their goals.\n\n  Summary:\n  Suggestions:`,
});

const generateDailySummaryAndSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateDailySummaryAndSuggestionsFlow',
    inputSchema: DailySummaryAndSuggestionsInputSchema,
    outputSchema: DailySummaryAndSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
