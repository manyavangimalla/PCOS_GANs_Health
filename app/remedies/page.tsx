"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Leaf, ShoppingCart, ExternalLink, Check, Info } from "lucide-react"
import Image from "next/image"

export default function RemediesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const remedies = [
    {
      name: "Spearmint Tea",
      category: "Herbal Tea",
      description: "Natural anti-androgen properties help reduce excess testosterone and hirsutism",
      benefits: [
        "Reduces facial hair growth",
        "Balances hormone levels",
        "Improves insulin sensitivity",
        "Anti-inflammatory properties",
      ],
      howToUse: "Drink 2 cups daily (morning and evening) for at least 3 months for best results",
      dosage: "1-2 teaspoons of dried spearmint leaves per cup",
      image: "/spearmint-tea.jpg",
    },
    {
      name: "Cinnamon",
      category: "Spice",
      description: "Helps regulate menstrual cycles and improve insulin resistance",
      benefits: [
        "Regulates blood sugar levels",
        "Improves insulin sensitivity",
        "Reduces inflammation",
        "Helps regulate periods",
      ],
      howToUse: "Add 1/2 to 1 teaspoon to warm water, tea, or smoothies daily",
      dosage: "1-6 grams per day (about 1/2 to 1 teaspoon)",
      image: "/cinnamon.jpg",
    },
    {
      name: "Fenugreek Seeds",
      category: "Seeds",
      description: "Improves glucose metabolism and promotes hormonal balance",
      benefits: [
        "Improves insulin function",
        "Regulates menstrual cycles",
        "Reduces cholesterol",
        "Anti-inflammatory effects",
      ],
      howToUse: "Soak 1 tablespoon overnight, consume on empty stomach in the morning",
      dosage: "1-2 teaspoons of seeds daily",
      image: "/fenugreek.jpg",
    },
    {
      name: "Turmeric (Curcumin)",
      category: "Spice",
      description: "Powerful anti-inflammatory and antioxidant properties",
      benefits: [
        "Reduces inflammation",
        "Improves insulin resistance",
        "Supports liver detoxification",
        "Balances hormones",
      ],
      howToUse: "Mix 1/2 teaspoon with warm milk or water, add black pepper for absorption",
      dosage: "500-2000mg of curcumin daily",
      image: "/turmeric.jpg",
    },
    {
      name: "Flaxseeds",
      category: "Seeds",
      description: "Rich in omega-3 fatty acids and lignans that help balance hormones",
      benefits: [
        "Reduces androgen levels",
        "Improves insulin sensitivity",
        "Regulates menstrual cycles",
        "Rich in fiber and omega-3",
      ],
      howToUse: "Grind fresh and add 1-2 tablespoons to smoothies, yogurt, or oatmeal",
      dosage: "1-2 tablespoons of ground flaxseeds daily",
      image: "/flaxseeds.jpg",
    },
    {
      name: "Holy Basil (Tulsi)",
      category: "Herbal Tea",
      description: "Adaptogenic herb that reduces stress and balances cortisol levels",
      benefits: [
        "Reduces stress and anxiety",
        "Balances cortisol levels",
        "Improves insulin sensitivity",
        "Anti-inflammatory properties",
      ],
      howToUse: "Brew fresh or dried leaves as tea, drink 1-2 cups daily",
      dosage: "300-600mg of extract or 2-3 cups of tea daily",
      image: "/holy-basil.jpg",
    },
    {
      name: "Apple Cider Vinegar",
      category: "Tonic",
      description: "Helps improve insulin sensitivity and regulate blood sugar",
      benefits: [
        "Improves insulin sensitivity",
        "Aids weight management",
        "Regulates blood sugar",
        "Improves digestion",
      ],
      howToUse: "Mix 1-2 tablespoons in warm water, drink before meals",
      dosage: "1-2 tablespoons diluted in water, 1-2 times daily",
      image: "/apple-cider-vinegar.jpg",
    },
    {
      name: "Ashwagandha",
      category: "Adaptogen",
      description: "Powerful adaptogen that balances hormones and reduces stress",
      benefits: [
        "Reduces cortisol levels",
        "Balances thyroid hormones",
        "Improves insulin sensitivity",
        "Reduces anxiety and stress",
      ],
      howToUse: "Take as supplement or mix powder in warm milk before bed",
      dosage: "300-500mg of extract twice daily",
      image: "/ashwagandha.jpg",
    },
  ]

  const products = [
    {
      name: "Organic Spearmint Tea",
      brand: "Traditional Medicinals",
      price: "$6.99",
      description: "100% organic spearmint leaf tea, caffeine-free",
      links: [
        { store: "Amazon", url: "https://amazon.com/spearmint-tea" },
        { store: "CVS", url: "https://cvs.com/spearmint-tea" },
        { store: "Whole Foods", url: "https://wholefoodsmarket.com/spearmint-tea" },
      ],
      whyUse: "Clinically proven to reduce hirsutism and balance hormones in PCOS",
    },
    {
      name: "Ceylon Cinnamon Powder",
      brand: "Simply Organic",
      price: "$8.49",
      description: "True Ceylon cinnamon, superior quality",
      links: [
        { store: "Amazon", url: "https://amazon.com/ceylon-cinnamon" },
        { store: "Vitacost", url: "https://vitacost.com/ceylon-cinnamon" },
        { store: "iHerb", url: "https://iherb.com/ceylon-cinnamon" },
      ],
      whyUse: "Ceylon cinnamon is safer for daily use and more effective for blood sugar control",
    },
    {
      name: "Organic Fenugreek Seeds",
      brand: "Starwest Botanicals",
      price: "$12.99",
      description: "Whole fenugreek seeds, organic certified",
      links: [
        { store: "Amazon", url: "https://amazon.com/fenugreek-seeds" },
        { store: "Mountain Rose Herbs", url: "https://mountainroseherbs.com/fenugreek" },
      ],
      whyUse: "Whole seeds retain maximum potency for insulin sensitivity and hormone balance",
    },
    {
      name: "Turmeric Curcumin with BioPerine",
      brand: "Nature's Nutrition",
      price: "$19.99",
      description: "High-potency curcumin with black pepper extract for absorption",
      links: [
        { store: "Amazon", url: "https://amazon.com/turmeric-curcumin" },
        { store: "CVS", url: "https://cvs.com/turmeric-supplement" },
        { store: "Walgreens", url: "https://walgreens.com/turmeric" },
      ],
      whyUse: "BioPerine increases curcumin absorption by 2000%, maximizing anti-inflammatory benefits",
    },
    {
      name: "Organic Ground Flaxseed",
      brand: "Bob's Red Mill",
      price: "$7.99",
      description: "Freshly ground organic flaxseeds",
      links: [
        { store: "Amazon", url: "https://amazon.com/ground-flaxseed" },
        { store: "Target", url: "https://target.com/flaxseed" },
        { store: "Walmart", url: "https://walmart.com/flaxseed" },
      ],
      whyUse: "Ground flaxseeds are easier to digest and provide better hormone-balancing benefits",
    },
    {
      name: "Organic Tulsi (Holy Basil) Tea",
      brand: "Organic India",
      price: "$9.99",
      description: "Pure holy basil tea, stress-relieving adaptogen",
      links: [
        { store: "Amazon", url: "https://amazon.com/tulsi-tea" },
        { store: "Whole Foods", url: "https://wholefoodsmarket.com/tulsi-tea" },
        { store: "Thrive Market", url: "https://thrivemarket.com/tulsi-tea" },
      ],
      whyUse: "Adaptogenic properties help manage stress-related hormonal imbalances in PCOS",
    },
    {
      name: "Raw Apple Cider Vinegar with Mother",
      brand: "Bragg",
      price: "$5.99",
      description: "Unfiltered, unpasteurized with the 'mother'",
      links: [
        { store: "Amazon", url: "https://amazon.com/bragg-acv" },
        { store: "CVS", url: "https://cvs.com/apple-cider-vinegar" },
        { store: "Target", url: "https://target.com/bragg-acv" },
      ],
      whyUse: "The 'mother' contains beneficial enzymes and probiotics for gut and metabolic health",
    },
    {
      name: "Ashwagandha Root Extract",
      brand: "Gaia Herbs",
      price: "$24.99",
      description: "Full-spectrum ashwagandha extract, stress support",
      links: [
        { store: "Amazon", url: "https://amazon.com/ashwagandha" },
        { store: "Whole Foods", url: "https://wholefoodsmarket.com/ashwagandha" },
        { store: "Vitacost", url: "https://vitacost.com/ashwagandha" },
      ],
      whyUse: "Clinically studied to reduce cortisol and support thyroid function in PCOS",
    },
  ]

  const faqs = [
    {
      question: "How long does it take to see results from natural remedies?",
      answer:
        "Most natural remedies require consistent use for 3-6 months to see significant results. Hormonal balance takes time, and patience is key. Some women notice improvements in symptoms like acne or energy levels within 4-6 weeks, while menstrual regularity may take 3-4 months.",
    },
    {
      question: "Can I use multiple remedies together?",
      answer:
        "Yes, many natural remedies work synergistically. However, start with one or two remedies and gradually add others. This helps you identify what works best for your body. Always consult with a healthcare provider, especially if you're taking medications.",
    },
    {
      question: "Are natural remedies safe during pregnancy?",
      answer:
        "Many herbs and supplements should be avoided during pregnancy. If you're pregnant or trying to conceive, consult your healthcare provider before using any natural remedies. Some herbs like fenugreek and ashwagandha are not recommended during pregnancy.",
    },
    {
      question: "Do I need to stop my PCOS medications to try natural remedies?",
      answer:
        "No, never stop prescribed medications without consulting your doctor. Natural remedies can often complement conventional treatment. Discuss with your healthcare provider about integrating natural approaches with your current treatment plan.",
    },
    {
      question: "What's the difference between Ayurvedic and Western herbal medicine?",
      answer:
        "Ayurvedic medicine is a holistic system from India that considers individual constitution (dosha) and treats the whole person. Western herbal medicine focuses more on specific symptoms and conditions. Both can be effective for PCOS when used appropriately.",
    },
    {
      question: "Can natural remedies cure PCOS?",
      answer:
        "PCOS cannot be 'cured,' but symptoms can be effectively managed with natural remedies, lifestyle changes, and medical treatment. Natural approaches can help balance hormones, improve insulin sensitivity, and reduce symptoms significantly.",
    },
    {
      question: "Are there any side effects from these natural remedies?",
      answer:
        "While generally safe, natural remedies can have side effects. Spearmint tea may cause digestive upset in some people. Fenugreek can cause a maple syrup smell in sweat. Always start with small doses and monitor your body's response.",
    },
    {
      question: "How do I know which remedies are right for me?",
      answer:
        "Consider your specific symptoms and health goals. For hirsutism, try spearmint tea. For insulin resistance, cinnamon and fenugreek are helpful. For stress and anxiety, ashwagandha and holy basil work well. Consult with an Ayurvedic practitioner or naturopath for personalized guidance.",
    },
  ]

  const categories = ["all", "Herbal Tea", "Spice", "Seeds", "Adaptogen", "Tonic"]

  const filteredRemedies =
    selectedCategory === "all" ? remedies : remedies.filter((r) => r.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Natural & Ayurvedic Remedies for PCOS</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover time-tested natural remedies and Ayurvedic solutions to manage PCOS symptoms, balance hormones, and
            improve your overall well-being
          </p>
        </div>

        {/* Info Banner */}
        <Card className="mb-8 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-foreground">
                  <strong>Important:</strong> Natural remedies work best when combined with a healthy diet, regular
                  exercise, and stress management. Always consult with your healthcare provider before starting any new
                  supplement or herbal remedy, especially if you're taking medications or have other health conditions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="remedies" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="remedies">Natural Remedies</TabsTrigger>
            <TabsTrigger value="products">Recommended Products</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
          </TabsList>

          <TabsContent value="remedies" className="mt-6 space-y-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === "all" ? "All Remedies" : cat}
                </Button>
              ))}
            </div>

            {/* Remedies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRemedies.map((remedy, i) => (
                <Card key={i} className="overflow-hidden hover:border-primary/50 transition-colors">
                  <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5">
                    <Image
                      src={remedy.image || "/placeholder.svg"}
                      alt={remedy.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl">{remedy.name}</CardTitle>
                      <Badge variant="secondary">{remedy.category}</Badge>
                    </div>
                    <CardDescription>{remedy.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-2">Benefits:</h4>
                      <ul className="space-y-1">
                        {remedy.benefits.map((benefit, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-1">How to Use:</h4>
                      <p className="text-sm text-muted-foreground">{remedy.howToUse}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-1">Recommended Dosage:</h4>
                      <p className="text-sm text-muted-foreground">{remedy.dosage}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="products" className="mt-6 space-y-6">
            <div className="space-y-4">
              {products.map((product, i) => (
                <Card key={i} className="hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {product.brand} • {product.price}
                        </CardDescription>
                      </div>
                      <ShoppingCart className="h-5 w-5 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{product.description}</p>

                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <h4 className="font-semibold text-sm text-foreground mb-1 flex items-center gap-2">
                        <Info className="h-4 w-4 text-primary" />
                        Why Use This Product?
                      </h4>
                      <p className="text-sm text-muted-foreground">{product.whyUse}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-2">Where to Buy:</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.links.map((link, j) => (
                          <a key={j} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-block">
                            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                              {link.store}
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </a>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="faqs" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Common questions about natural remedies for PCOS</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
