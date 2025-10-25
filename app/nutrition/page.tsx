"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Apple, ChefHat, ShoppingCart, TrendingDown, Flame, Activity, Download, RefreshCw } from "lucide-react"

export default function NutritionPage() {
  const [dietPreference, setDietPreference] = useState("balanced")
  const [calorieTarget, setCalorieTarget] = useState("1800")

  const mealPlan = {
    breakfast: {
      name: "Greek Yogurt Parfait with Berries",
      calories: 320,
      protein: 18,
      carbs: 42,
      fat: 8,
      fiber: 6,
      gi: "Low",
      ingredients: ["Greek yogurt", "Mixed berries", "Chia seeds", "Almonds", "Cinnamon"],
    },
    lunch: {
      name: "Quinoa Buddha Bowl",
      calories: 480,
      protein: 22,
      carbs: 58,
      fat: 16,
      fiber: 12,
      gi: "Low",
      ingredients: ["Quinoa", "Chickpeas", "Spinach", "Avocado", "Tahini dressing"],
    },
    dinner: {
      name: "Grilled Salmon with Roasted Vegetables",
      calories: 520,
      protein: 38,
      carbs: 32,
      fat: 24,
      fiber: 8,
      gi: "Low",
      ingredients: ["Salmon fillet", "Broccoli", "Sweet potato", "Olive oil", "Lemon"],
    },
    snacks: [
      { name: "Apple with Almond Butter", calories: 180, protein: 4 },
      { name: "Handful of Walnuts", calories: 160, protein: 4 },
    ],
  }

  const totalNutrition = {
    calories: 1660,
    protein: 86,
    carbs: 132,
    fat: 48,
    fiber: 26,
  }

  const groceryList = [
    { category: "Proteins", items: ["Greek yogurt", "Salmon fillet", "Chickpeas", "Eggs"] },
    {
      category: "Fruits & Vegetables",
      items: ["Mixed berries", "Spinach", "Broccoli", "Sweet potato", "Avocado", "Apple", "Lemon"],
    },
    { category: "Grains & Seeds", items: ["Quinoa", "Chia seeds", "Oats"] },
    { category: "Nuts & Healthy Fats", items: ["Almonds", "Walnuts", "Almond butter", "Olive oil", "Tahini"] },
    { category: "Spices & Extras", items: ["Cinnamon", "Turmeric", "Garlic", "Ginger"] },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">AI Nutrition & Meal Planner</h1>
          <p className="text-muted-foreground">PCOS-friendly meal plans tailored to your needs</p>
        </div>

        {/* Preferences Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Meal Plan Preferences</CardTitle>
            <CardDescription>Customize your nutrition plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Diet Type</Label>
                <Select value={dietPreference} onValueChange={setDietPreference}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="low-carb">Low Carb</SelectItem>
                    <SelectItem value="mediterranean">Mediterranean</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Daily Calorie Target</Label>
                <Input
                  type="number"
                  value={calorieTarget}
                  onChange={(e) => setCalorieTarget(e.target.value)}
                  placeholder="1800"
                />
              </div>

              <div className="space-y-2">
                <Label>Meal Frequency</Label>
                <Select defaultValue="3-meals">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3-meals">3 Meals + Snacks</SelectItem>
                    <SelectItem value="5-small">5 Small Meals</SelectItem>
                    <SelectItem value="intermittent">Intermittent Fasting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Label>Dietary Restrictions</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Gluten-Free", "Dairy-Free", "Nut-Free", "Soy-Free"].map((restriction) => (
                  <div key={restriction} className="flex items-center space-x-2">
                    <Checkbox id={restriction} />
                    <label htmlFor={restriction} className="text-sm text-foreground cursor-pointer">
                      {restriction}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button className="mt-6 w-full md:w-auto">
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate New Meal Plan
            </Button>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="meal-plan" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="meal-plan">Today's Meal Plan</TabsTrigger>
            <TabsTrigger value="grocery">Grocery List</TabsTrigger>
            <TabsTrigger value="tracker">Nutrition Tracker</TabsTrigger>
          </TabsList>

          <TabsContent value="meal-plan" className="mt-6 space-y-6">
            {/* Daily Nutrition Summary */}
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle>Daily Nutrition Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <Flame className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{totalNutrition.calories}</p>
                    <p className="text-xs text-muted-foreground">Calories</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{totalNutrition.protein}g</p>
                    <p className="text-xs text-muted-foreground">Protein</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{totalNutrition.carbs}g</p>
                    <p className="text-xs text-muted-foreground">Carbs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{totalNutrition.fat}g</p>
                    <p className="text-xs text-muted-foreground">Fat</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{totalNutrition.fiber}g</p>
                    <p className="text-xs text-muted-foreground">Fiber</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Low GI
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Anti-Inflammatory
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    High Fiber
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Meals */}
            {Object.entries(mealPlan)
              .filter(([key]) => key !== "snacks")
              .map(([mealType, meal]) => (
                <Card key={mealType}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="capitalize">{mealType}</CardTitle>
                        <CardDescription className="mt-1">{meal.name}</CardDescription>
                      </div>
                      <ChefHat className="h-8 w-8 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Calories</p>
                        <p className="text-lg font-semibold text-foreground">{meal.calories}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Protein</p>
                        <p className="text-lg font-semibold text-foreground">{meal.protein}g</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Carbs</p>
                        <p className="text-lg font-semibold text-foreground">{meal.carbs}g</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Fat</p>
                        <p className="text-lg font-semibold text-foreground">{meal.fat}g</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Fiber</p>
                        <p className="text-lg font-semibold text-foreground">{meal.fiber}g</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">GI</p>
                        <Badge variant="outline" className="mt-1">
                          {meal.gi}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Ingredients:</p>
                      <div className="flex flex-wrap gap-2">
                        {meal.ingredients.map((ingredient, i) => (
                          <Badge key={i} variant="secondary">
                            {ingredient}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                      View Recipe
                    </Button>
                  </CardContent>
                </Card>
              ))}

            {/* Snacks */}
            <Card>
              <CardHeader>
                <CardTitle>Snacks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mealPlan.snacks.map((snack, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{snack.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {snack.calories} cal • {snack.protein}g protein
                        </p>
                      </div>
                      <Apple className="h-5 w-5 text-primary" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grocery" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Smart Grocery List</CardTitle>
                    <CardDescription>Auto-generated from your meal plan</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export List
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {groceryList.map((section) => (
                    <div key={section.category}>
                      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5 text-primary" />
                        {section.category}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {section.items.map((item, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <Checkbox id={`${section.category}-${i}`} />
                            <label
                              htmlFor={`${section.category}-${i}`}
                              className="text-sm text-foreground cursor-pointer"
                            >
                              {item}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracker" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Tracker</CardTitle>
                <CardDescription>Log your meals and track macros</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="border-primary/20">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <Flame className="h-8 w-8 text-primary mx-auto mb-2" />
                          <p className="text-2xl font-bold text-foreground">1245</p>
                          <p className="text-xs text-muted-foreground">of 1800 calories</p>
                          <div className="w-full bg-secondary rounded-full h-2 mt-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: "69%" }} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-primary/20">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <Activity className="h-8 w-8 text-primary mx-auto mb-2" />
                          <p className="text-2xl font-bold text-foreground">62g</p>
                          <p className="text-xs text-muted-foreground">of 90g protein</p>
                          <div className="w-full bg-secondary rounded-full h-2 mt-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: "69%" }} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-primary/20">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <TrendingDown className="h-8 w-8 text-primary mx-auto mb-2" />
                          <p className="text-2xl font-bold text-foreground">98g</p>
                          <p className="text-xs text-muted-foreground">of 150g carbs</p>
                          <div className="w-full bg-secondary rounded-full h-2 mt-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-primary/20">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <Apple className="h-8 w-8 text-primary mx-auto mb-2" />
                          <p className="text-2xl font-bold text-foreground">18g</p>
                          <p className="text-xs text-muted-foreground">of 25g fiber</p>
                          <div className="w-full bg-secondary rounded-full h-2 mt-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: "72%" }} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Today's Logged Meals</h3>
                    <div className="space-y-2">
                      {[
                        { meal: "Breakfast", name: "Greek Yogurt Parfait", calories: 320, time: "8:30 AM" },
                        { meal: "Lunch", name: "Quinoa Buddha Bowl", calories: 480, time: "12:45 PM" },
                        { meal: "Snack", name: "Apple with Almond Butter", calories: 180, time: "3:00 PM" },
                      ].map((entry, i) => (
                        <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium text-foreground">{entry.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {entry.meal} • {entry.time}
                            </p>
                          </div>
                          <p className="font-semibold text-foreground">{entry.calories} cal</p>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4">Add Meal</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
