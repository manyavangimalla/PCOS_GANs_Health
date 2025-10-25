import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BookOpen, Heart, Utensils, Activity, Pill, Users, ExternalLink, Info } from "lucide-react"
import Link from "next/link"

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl">Understanding PCOS</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Comprehensive information about Polycystic Ovary Syndrome, its symptoms, diagnosis, and management
          </p>
        </div>

        {/* What is PCOS */}
        <Card className="mb-8 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-serif text-2xl font-bold">What is PCOS?</h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Polycystic Ovary Syndrome (PCOS) is a common hormonal disorder that affects approximately 1 in 10 women of
              reproductive age. Despite its name, not all women with PCOS have cysts on their ovaries, and having
              ovarian cysts doesn't necessarily mean you have PCOS.
            </p>
            <p>
              PCOS is characterized by a combination of symptoms related to hormonal imbalances, particularly elevated
              levels of androgens (male hormones). These imbalances can affect menstrual cycles, fertility, metabolism,
              and physical appearance.
            </p>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                PCOS is a lifelong condition, but with proper management, most symptoms can be controlled and long-term
                health risks can be minimized.
              </AlertDescription>
            </Alert>
          </div>
        </Card>

        {/* Symptoms */}
        <Card className="mb-8 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-serif text-2xl font-bold">Common Symptoms</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              PCOS symptoms can vary widely from person to person. Some women experience mild symptoms, while others are
              more severely affected.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold">Menstrual Irregularities</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Infrequent periods (fewer than 9 per year)</li>
                  <li>• Absent periods (amenorrhea)</li>
                  <li>• Heavy or prolonged bleeding</li>
                  <li>• Unpredictable cycle lengths</li>
                </ul>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold">Excess Androgen</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Excess facial and body hair (hirsutism)</li>
                  <li>• Severe acne or oily skin</li>
                  <li>• Male-pattern baldness or thinning hair</li>
                </ul>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold">Metabolic Issues</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Weight gain or difficulty losing weight</li>
                  <li>• Insulin resistance</li>
                  <li>• Darkened skin patches (acanthosis nigricans)</li>
                  <li>• Skin tags</li>
                </ul>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold">Other Symptoms</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Fertility difficulties</li>
                  <li>• Mood changes, anxiety, or depression</li>
                  <li>• Fatigue and low energy</li>
                  <li>• Sleep apnea</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Diagnosis */}
        <Card className="mb-8 p-6 md:p-8">
          <h2 className="mb-4 font-serif text-2xl font-bold">How is PCOS Diagnosed?</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              There is no single test to diagnose PCOS. Healthcare providers typically use the Rotterdam criteria, which
              requires at least 2 of the following 3 features:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-lg bg-muted p-4">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Irregular or absent ovulation</p>
                  <p className="text-sm">Indicated by irregular or absent menstrual periods</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-muted p-4">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Signs of excess androgens</p>
                  <p className="text-sm">
                    Physical signs (excess hair, acne) or elevated androgen levels in blood tests
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-muted p-4">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Polycystic ovaries</p>
                  <p className="text-sm">Visible on ultrasound imaging</p>
                </div>
              </div>
            </div>
            <p className="pt-2">
              Your doctor may also perform blood tests to check hormone levels, glucose tolerance, and cholesterol
              levels, and rule out other conditions with similar symptoms.
            </p>
          </div>
        </Card>

        {/* Management Strategies */}
        <Card className="mb-8 p-6 md:p-8">
          <h2 className="mb-6 font-serif text-2xl font-bold">Managing PCOS</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="lifestyle">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Lifestyle Modifications</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pt-4 text-muted-foreground">
                <p>
                  Lifestyle changes are often the first line of treatment for PCOS and can significantly improve
                  symptoms:
                </p>
                <ul className="space-y-2 pl-4">
                  <li>
                    <strong className="text-foreground">Weight Management:</strong> Even a 5-10% reduction in body
                    weight can improve symptoms and restore regular periods
                  </li>
                  <li>
                    <strong className="text-foreground">Regular Exercise:</strong> Aim for 150 minutes of moderate
                    activity per week to improve insulin sensitivity
                  </li>
                  <li>
                    <strong className="text-foreground">Stress Reduction:</strong> Practice mindfulness, yoga, or other
                    stress-management techniques
                  </li>
                  <li>
                    <strong className="text-foreground">Quality Sleep:</strong> Aim for 7-9 hours of sleep per night to
                    support hormonal balance
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="diet">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-3">
                  <Utensils className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Nutrition and Diet</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pt-4 text-muted-foreground">
                <p>A balanced diet can help manage insulin levels and reduce PCOS symptoms:</p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-foreground">Foods to Emphasize:</p>
                    <ul className="mt-1 space-y-1 pl-4 text-sm">
                      <li>• High-fiber foods (vegetables, whole grains, legumes)</li>
                      <li>• Lean proteins (fish, chicken, tofu)</li>
                      <li>• Healthy fats (avocado, nuts, olive oil)</li>
                      <li>• Anti-inflammatory foods (berries, fatty fish, leafy greens)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Foods to Limit:</p>
                    <ul className="mt-1 space-y-1 pl-4 text-sm">
                      <li>• Refined carbohydrates and sugars</li>
                      <li>• Processed foods</li>
                      <li>• Excessive red meat</li>
                      <li>• Trans fats and fried foods</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="medical">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-3">
                  <Pill className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Medical Treatments</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pt-4 text-muted-foreground">
                <p>Your healthcare provider may recommend medications to manage specific symptoms:</p>
                <ul className="space-y-2 pl-4">
                  <li>
                    <strong className="text-foreground">Birth Control Pills:</strong> Help regulate menstrual cycles and
                    reduce androgen levels
                  </li>
                  <li>
                    <strong className="text-foreground">Metformin:</strong> Improves insulin resistance and may help
                    with weight management
                  </li>
                  <li>
                    <strong className="text-foreground">Anti-androgens:</strong> Reduce excess hair growth and acne
                  </li>
                  <li>
                    <strong className="text-foreground">Fertility Medications:</strong> For women trying to conceive
                  </li>
                </ul>
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Always consult with your healthcare provider before starting any medication. Treatment plans should
                    be personalized to your specific symptoms and health goals.
                  </AlertDescription>
                </Alert>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="support">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Emotional Support</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pt-4 text-muted-foreground">
                <p>Living with PCOS can be emotionally challenging. Support is available:</p>
                <ul className="space-y-2 pl-4">
                  <li>
                    <strong className="text-foreground">Support Groups:</strong> Connect with others who understand your
                    experience
                  </li>
                  <li>
                    <strong className="text-foreground">Mental Health Care:</strong> Consider therapy or counseling to
                    address anxiety or depression
                  </li>
                  <li>
                    <strong className="text-foreground">Online Communities:</strong> Join forums and social media groups
                    for daily support
                  </li>
                  <li>
                    <strong className="text-foreground">Education:</strong> Stay informed about PCOS research and
                    management strategies
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        {/* Long-term Health */}
        <Card className="mb-8 p-6 md:p-8">
          <h2 className="mb-4 font-serif text-2xl font-bold">Long-term Health Considerations</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>Women with PCOS have an increased risk of developing certain health conditions:</p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold text-foreground">Type 2 Diabetes</h3>
                <p className="text-sm">
                  Insulin resistance is common in PCOS. Regular screening and lifestyle management are important.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold text-foreground">Heart Disease</h3>
                <p className="text-sm">Monitor blood pressure, cholesterol, and maintain a heart-healthy lifestyle.</p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold text-foreground">Endometrial Cancer</h3>
                <p className="text-sm">
                  Irregular periods can increase risk. Regular gynecological check-ups are essential.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold text-foreground">Sleep Apnea</h3>
                <p className="text-sm">More common in women with PCOS, especially those who are overweight.</p>
              </div>
            </div>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Regular health screenings and proactive management can significantly reduce these risks. Work with your
                healthcare team to develop a comprehensive monitoring plan.
              </AlertDescription>
            </Alert>
          </div>
        </Card>

        {/* Resources */}
        <Card className="mb-8 bg-secondary p-6 md:p-8">
          <h2 className="mb-4 font-serif text-2xl font-bold">Additional Resources</h2>
          <div className="space-y-3">
            <a
              href="https://www.pcosaa.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border bg-card p-4 transition-colors hover:bg-muted"
            >
              <div>
                <p className="font-medium">PCOS Awareness Association</p>
                <p className="text-sm text-muted-foreground">Educational resources and support</p>
              </div>
              <ExternalLink className="h-5 w-5 text-muted-foreground" />
            </a>
            <a
              href="https://www.womenshealth.gov/a-z-topics/polycystic-ovary-syndrome"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border bg-card p-4 transition-colors hover:bg-muted"
            >
              <div>
                <p className="font-medium">Office on Women's Health</p>
                <p className="text-sm text-muted-foreground">Government health information</p>
              </div>
              <ExternalLink className="h-5 w-5 text-muted-foreground" />
            </a>
            <a
              href="https://www.acog.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border bg-card p-4 transition-colors hover:bg-muted"
            >
              <div>
                <p className="font-medium">American College of Obstetricians and Gynecologists</p>
                <p className="text-sm text-muted-foreground">Medical guidelines and patient education</p>
              </div>
              <ExternalLink className="h-5 w-5 text-muted-foreground" />
            </a>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h3 className="mb-4 font-serif text-2xl font-bold">Ready to Assess Your Risk?</h3>
          <p className="mb-6 text-muted-foreground">
            Take our comprehensive assessment to better understand your PCOS risk factors
          </p>
          <Button asChild size="lg">
            <Link href="/assessment">Start Assessment</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
