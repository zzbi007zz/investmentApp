"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function InvestmentSuggestionAppComponent() {
  const [monthlyIncome, setMonthlyIncome] = useState("")
  const [monthlyExpenses, setMonthlyExpenses] = useState("")
  const [investmentVision, setInvestmentVision] = useState("")
  const [aiIntelligence, setAiIntelligence] = useState("")
  const [suggestion, setSuggestion] = useState("");

  const handleGenerateSuggestion = async () => {
    try {
      const response = await fetch('http://localhost:4000/investment-suggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ monthlyIncome, monthlyExpenses, investmentVision }),
      });
      const data = await response.json();
      setSuggestion(data.suggestion);
    } catch (error) {
      console.error("Error generating investment suggestion:", error);
      setSuggestion("Error generating suggestion. Please try again.");
    }
  };


  return (
    <div className="min-h-screen bg-black text-white p-8 flex">
      <div className="w-1/2 pr-4 space-y-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Investment Planner</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="monthlyIncome" className="text-white">Your Monthly Income</Label>
              <Input
                id="monthlyIncome"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyExpenses" className="text-white">Your Monthly Expenses</Label>
              <Input
                id="monthlyExpenses"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="investmentVision" className="text-white">Enter Your Investment Vision</Label>
              <Input
                id="investmentVision"
                value={investmentVision}
                onChange={(e) => setInvestmentVision(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="to the mooooooon!"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aiIntelligence" className="text-white">Select Intelligence Level</Label>
              <Select onValueChange={setAiIntelligence}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select AI intelligence" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white">
                  <SelectItem value="low" className="text-white">Low</SelectItem>
                  <SelectItem value="medium" className="text-white">Medium</SelectItem>
                  <SelectItem value="high" className="text-white">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleGenerateSuggestion}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
            >
              Generate Investment Suggestion
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="w-1/2 pl-4">
        <Card className="bg-gray-900 border-gray-800 h-full">
          <CardHeader>
            <CardTitle className="text-white">Investment Suggestions Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 overflow-auto text-white">
              {suggestion ? (
                <div className="whitespace-pre-wrap">{suggestion}</div>
              ) : (
                "Investment suggestions will be displayed here"
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}