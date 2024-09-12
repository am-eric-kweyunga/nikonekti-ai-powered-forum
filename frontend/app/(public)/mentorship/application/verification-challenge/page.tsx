/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle2, Loader2, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'

export default function EmailVerificationPage({ searchParams }: { searchParams: { token: string } }) {
  const router = useRouter()
  const token = searchParams.token
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    if (token) {
      verifyEmail(token as string)
    }
  }, [token])

  const verifyEmail = async (token: string) => {
    setVerificationStatus('loading')

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/mailer/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })

      if (!res.ok) {
        throw new Error('Failed to verify')
      }

      const response = await res.json()

      if (response.status === 'success') {
        setVerificationStatus('success')

        toast({
          title: 'Success',
          description: 'Your email has been verified successfully!',
        })

        setTimeout(() => router.push('/dashboard'), 3000)
      } else if (response.status === "expired") {

        setVerificationStatus('error')
        toast({
          title: 'Error',
          description: 'Your email verification link has expired. Please request a new verification link.',
          variant: 'destructive',
        })

      } else {

        setVerificationStatus('error')
        toast({
          title: 'Error',
          description: 'Failed to verify email. Please try again or contact support.',
          variant: 'destructive',
        })

      }

    } catch (error) {
      setVerificationStatus('error')
      toast({
        title: 'Error',
        description: 'Email verification failed. Please try again or contact support.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="min-h-screen p-2 md:p-6 bg-gradient-to-b from-blue-50 to-white">
      <Card className="max-w-md mx-auto bg-white shadow-lg rounded-lg border-t-4 border-blue-500">
        <CardHeader className="border-b text-black p-6 flex flex-col items-center">
          <CardTitle className="text-xl md:text-2xl font-bold items-center flex flex-col gap-4">
            <img src="/images/nikonekti/nikonekti.svg" alt="Nikonekti Logo" className="w-32" />
            Email Verification
          </CardTitle>
          <CardDescription className="text-muted-foreground text-center py-4">
            Verifying your email for Nikonekti
          </CardDescription>
        </CardHeader>
        <CardContent className="py-6 space-y-6 text-center">
          {verificationStatus === 'loading' && (
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
              <p className="text-lg font-semibold">Verifying your email...</p>
              <p className="text-sm text-gray-600">This may take a few moments. Please don&apos;t close this page.</p>
            </div>
          )}

          {verificationStatus === 'success' && (
            <div className="flex flex-col items-center space-y-4">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
              <p className="text-lg font-semibold text-green-600">Email Verified Successfully!</p>
              <p className="text-sm text-gray-600">Thank you for verifying your email. You&apos;re now ready to use Nikonekti.</p>
              <p className="text-sm text-gray-600">Redirecting you to the dashboard...</p>
            </div>
          )}

          {verificationStatus === 'error' && (
            <div className="flex flex-col items-center space-y-4">
              <XCircle className="h-12 w-12 text-red-500" />
              <p className="text-lg font-semibold text-red-600">Verification Failed</p>
              <p className="text-sm text-gray-600">We encountered an issue while verifying your email.</p>
              <Button
                onClick={() => verifyEmail}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Try Again
              </Button>
            </div>
          )}

          <div className="mt-6 text-sm text-gray-600">
            <p>If you&apos;re experiencing issues, please contact our <a href="/support" className="text-blue-600 hover:underline">support team</a>.</p>
          </div>
        </CardContent>
      </Card>
      <footer className="mt-8 text-center text-sm text-gray-600">
        <p>© 2024 Nikonekti - Empowering Tanzania&apos;s Future for Youth</p>
      </footer>
    </div>
  )
}