import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Brain, Target, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function MentorLandingPage() {

  return (
    <div className="min-h-screen bg-white text-black w-full">
      <header className="bg-blue-700 text-white py-12 text-center md:text-start">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold">Join as a Mentor on Nikonekti</h1>
          <p className="mt-5 py-10">
            Guide the next generation of Tanzanian professionals with your experience and expertise.
          </p>
        </div>
      </header>

      <main className="container md:max-w-4xl mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Why Mentor with Nikonekti?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: "Share Your Expertise",
                description: "Pass on your knowledge to help students make informed career choices.",
              },
              {
                icon: Users,
                title: "Expand Your Network",
                description: "Connect with students and fellow professionals across Tanzania.",
              },
              {
                icon: Target,
                title: "Impact Tanzanian Youth",
                description: "Help shape the future careers of students from O-level to university.",
              },
            ].map((benefit, index) => (
              <Card key={index} className="bg-blue-50">
                <CardContent className="p-6">
                  <benefit.icon className="w-12 h-12 text-blue-700 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Mentor Requirements</h2>
          <ul className="space-y-4">
            {[
              "At least 3 years of professional experience in your field.",
              "Good communication skills and a passion for guiding others.",
              "A commitment of 2 hours per week for mentoring online.",
              "Willingness to support students' educational and career growth.",
            ].map((requirement, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-700 mr-2 flex-shrink-0" />
                <span>{requirement}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">How to Join as a Mentor</h2>
          <ol className="space-y-6">
            {[
              "Complete the full online application.",
              "Read craefull our mentorship guidelines and guidebooks.",
              "Determine who are you going to mentor and what are you going to mentor.",
              "Start mentoring and make a real impact!",
            ].map((step, index) => (
              <li key={index} className="flex items-center">
                <span className="bg-blue-700 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-blue-700 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Ready to Inspire?</h2>
          <p className="mb-6">Join Nikonekti and start mentoring students across Tanzania online.</p>
          <Link
            href="/mentorship/application"
          >
            <Button className="bg-white text-blue-700 hover:bg-blue-100">
              Apply Online Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </section>
      </main>

      <footer className="bg-gray-100 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Nikonekti Forum. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
