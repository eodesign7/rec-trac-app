import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart, Check, Search, Upload } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: <Upload />,
    iconColor: "text-blue-500",
    iconBgColor: "bg-blue-100",
    title: "Easy Upload",
    description:
      "Drag and Drop your PDF receipts for instant scanning and processing.",
  },

  {
    icon: <Search />,
    iconColor: "text-green-500",
    iconBgColor: "bg-green-100",
    title: "AI Analysis",
    description:
      "Automatically extract and categorize your receipts with our AI-powered analysis.",
  },

  {
    icon: <BarChart />,
    iconColor: "text-purple-500",
    iconBgColor: "bg-purple-100",
    title: "Expense Insights",
    description:
      "Generate report nad gain valuable insights from your spending patterns.",
  },
];

type Plan = {
  name: string;
  description: string;
  price: string;
  features: string[];
  buttonText: string;
  buttonVariant: "outline" | "default";
  buttonColor?: string;
  bgColor?: string;
  borderColor?: string;
  isPopular?: boolean;
};

const plans = [
  {
    name: "Free",
    description: "For personal use",
    price: "$0.00",
    features: ["2 scan per month", "Basic data extraction", "7-days history"],
    buttonText: "Get Started for Free",
    buttonVariant: "outline" as const,
  },
  {
    name: "Starter",
    description: "A Taste of expensing goodness",
    price: "$10/month",
    features: [
      "50 scans / month",
      "Enhanced data extraction",
      "30-days history",
      "Basic export options",
    ],
    buttonText: "Subscribe Now",
    buttonVariant: "default" as const,
  },
  {
    name: "Pro",
    description: "Pro features for the Pro users",
    price: "$9.99/month",
    features: [
      "300 scans / month",
      "Advanced AI data extraction",
      "AI Summary",
      "Expense Categories & Tags",
      "Advanced Export options",
      "Unlimited History",
    ],
    buttonText: "Get Started",
    buttonVariant: "default" as const,
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    bgColor: "bg-blue-50 dark:bg-blue-900",
    borderColor: "border-blue-200 dark:border-blue-800",
    isPopular: true,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className=" container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Intelligent Receipt Scanning with ReTrack
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl dark:text-muted-foreground/80">
                Scan, analyze and organize your receipts with AI-powered
                precision. <br />
                Save time and gain insights from your expenses.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="space-x-4">
              <Link href="/receipts">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link className="bg-blue-600 hover:bg-blue-700" href="#features">
                <Button variant={"outline"}>Learn More</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* PDF Dropzone */}
        <div className="mt-12 flex justify-center">
          <div className="relative w-full max-w-3xl rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden dark:border-gray-800 dark:bg-gray-950xa">
            <div className="p-6 md:p-8 relative">
              <p>PDF Dropzone goes here...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl">
                Powerful Features
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl dark:text-muted-foreground/80">
                Our AI-powered platform transforms how you handle receipts and
                track expenses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 ">
              {features.map((feature) => (
                <FeatureCard key={feature.title} feature={feature} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl">
                Simple Pricing
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl dark:text-muted-foreground/80">
                Choose the plan that best fits your needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 ">
              {plans.map((plan) => (
                <PricingCard key={plan.name} plan={plan} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Start Scanning Today
              </h2>
              <p className="text-muted-foreground md:text-xl dark:text-muted-foreground/80">
                Join thousands of users who have already transformed their
                expense management with ReTrack.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="border-gray-200 dark:border-gray-800 border-t">
        <div className="container px-4 md:px-6 mx-auto py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-1">ReTrack</div>

            <div className="mt-4 md:mt-o">
              <p className="text-sm text-muted-foreground dark:text-muted-foreground/80">
                ©2025 ReTrack. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  feature,
}: {
  feature: {
    icon: React.ReactNode;
    iconColor: string;
    iconBgColor: string;
    title: string;
    description: string;
  };
}) {
  return (
    <div className="flex flex-col items-center space-y-2 border border-gray-200 rounded-lg p-6 dark:border-gray-800">
      <div
        className={`p-3 rounded-full ${feature.iconBgColor} dark:${feature.iconBgColor}`}
      >
        <div
          className={`p-3 rounded-full ${feature.iconColor} dark:${feature.iconColor}`}
        >
          {feature.icon}
        </div>
      </div>
      <h3 className="text-xl font-bold">{feature.title}</h3>
      <p className="text-muted-foreground dark:text-muted-foreground/80 text-center">
        {feature.description}
      </p>
    </div>
  );
}

function PricingCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center space-y-2 rounded-lg p-6 shadow-sm transition-all duration-200 hover:scale-105",
        "bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800",
        plan.bgColor,
        plan.borderColor,
        plan.isPopular && "scale-105 shadow-xl",
      )}
    >
      {plan.isPopular && (
        <Badge
          className="absolute -top-2 -right-2 bg-blue-500 hover:bg-blue-600"
          variant="default"
        >
          Most Popular
        </Badge>
      )}

      <div className="space-y-2">
        <h3 className="text-2xl font-bold">{plan.name}</h3>
        <p className="text-muted-foreground dark:text-muted-foreground/80 text-center">
          {plan.description}
        </p>
      </div>

      <div className="mt-4 text-center">
        <p className="text-4xl font-bold">{plan.price}</p>
        <p className="text-muted-foreground dark:text-muted-foreground/80">
          /mesiac
        </p>
      </div>

      <ul className="mt-6 space-y-2 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center">
            <Check className="w-5 h-5 text-green-500 mr-2 animate-[bounce_1s_ease-in-out]" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="pt-12 w-full">
        <Link href="/manage-plan">
          <Button
            className={cn(
              "w-full transition-all duration-200 hover:shadow-lg",
              plan.buttonColor,
            )}
            variant={plan.buttonVariant}
          >
            {plan.buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
}
