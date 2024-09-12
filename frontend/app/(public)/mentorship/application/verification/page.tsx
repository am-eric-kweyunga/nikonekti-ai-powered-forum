"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Mail, RefreshCw, HelpCircle } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

export default function EmailSentConfirmationPage() {
  const handleResendEmail = () => {
    // Simulate resending email
    toast({
      title: 'Email Resent',
      description: 'A new verification email has been sent to your inbox.',
    })
  }

  return (
    <div className="min-h-screen p-2 md:p-6 bg-gradient-to-b from-blue-50 to-white">
      <Card className="max-w-md mx-auto bg-white shadow-lg rounded-lg border-t-4 border-blue-500">
        <CardHeader className="border-b text-black p-6 flex flex-col items-center">
          <CardTitle className="text-xl md:text-2xl font-bold items-center flex flex-col gap-4">
            <img src="/images/nikonekti/nikonekti.svg" alt="Nikonekti Logo" className="w-32" />
            Email Verification Sent
          </CardTitle>
          <CardDescription className="text-muted-foreground text-center py-4">
            We've sent a verification email to complete your Nikonekti mentor registration
          </CardDescription>
        </CardHeader>
        <CardContent className="py-6 space-y-6">
          <div className="text-center">
            <Mail className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Check Your Email</h2>
            <p className="text-sm text-gray-600 mb-4">
              We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={handleResendEmail}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Resend Verification Email
            </Button>

            <Button 
              variant="outline"
              className="w-full border-blue-700 text-blue-700 hover:bg-blue-50 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
              onClick={() => window.location.href = '/support'}
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Need Help? Contact Support
            </Button>
          </div>

          <div className="text-sm text-gray-600 mt-6 space-y-2">
            <p>
              <strong>Didn't receive the email?</strong> Check your spam folder or try resending the verification email.
            </p>
            <p>
              If you're still having trouble, please don't hesitate to contact our support team for assistance.
            </p>
          </div>
        </CardContent>
      </Card>
      <footer className="mt-8 text-center text-sm text-gray-600">
        <p>© 2024 Nikonekti - Empowering Tanzania's Future for Youth</p>
      </footer>
    </div>
  )
}