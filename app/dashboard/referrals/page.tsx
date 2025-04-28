"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export default function Referrals() {
  const { toast } = useToast()
  const referralLink = "https://babylovegrowth.ai/sign-up?referral=FVQKEP7T"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
    toast({
      title: "Copied to clipboard",
      description: "Referral link has been copied to your clipboard",
    })
  }

  return (
    <div className="h-full p-4 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Referrals</h1>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Earn Passive Income Through Our Partner Program</h2>
            <p className="text-gray-600 mb-4">
              Refer friends and earn up to 50% of the recurring revenue for each successful referral!
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Share the unique invitation link</p>
              <div className="flex gap-2">
                <Input value={referralLink} readOnly className="bg-gray-50" />
                <Button variant="outline" size="icon" onClick={copyToClipboard} className="shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </Button>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Your Referrals</h3>
              <div className="grid grid-cols-2 font-medium text-sm mb-2">
                <div>Email</div>
                <div>Signed up date</div>
              </div>
              <div className="text-muted-foreground text-sm italic">
                No referrals yet. Share your link to start earning!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
