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
  prompt: `Anda adalah seorang ahli gizi yang memberikan ringkasan harian dan saran kepada pengguna berdasarkan asupan makanan dan tujuan mereka.\n\n  Berikut adalah asupan makanan harian pengguna:\n  {{dailyFoodIntake}}\n\n  Berikut adalah tujuan pengguna:\n  - Target Kalori: {{calorieGoal}} kalori\n  - Target Protein: {{proteinGoal}} gram\n  - Target Karbohidrat: {{carbGoal}} gram\n  - Target Lemak: {{fatGoal}} gram\n\n  Berikut adalah berat badan pengguna saat ini: {{currentWeight}} kg\n  Berikut adalah tingkat aktivitas pengguna: {{activityLevel}}\n\n  Buat ringkasan naratif tentang asupan makanan harian pengguna dan berikan saran yang dipersonalisasi untuk hari berikutnya untuk meningkatkan pola makan mereka dan membantu mereka mencapai tujuan mereka.\n\n  Ringkasan:\n  Saran:`,
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
