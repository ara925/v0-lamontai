import type React from "react"
import Image from "next/image"

interface OnboardingLayoutProps {
  children: React.ReactNode
  currentStep: number
  totalSteps: number
  stepTitle: string
}

export function OnboardingLayout({ children, currentStep, totalSteps, stepTitle }: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/placeholder.svg?height=40&width=200"
              alt="Lamont.ai"
              width={200}
              height={40}
              className="h-8 w-auto"
            />
          </div>
          <button className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md text-sm font-medium">
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-8 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Step indicator */}
            <div className="flex items-center space-x-2">
              <div className="bg-orange-500 text-white px-2 py-1 text-xs font-medium">
                {currentStep === totalSteps ? "Last Step" : `Step ${currentStep}`}
              </div>
            </div>

            {/* Step title */}
            <h1 className="text-3xl font-bold text-gray-900">{stepTitle}</h1>

            {/* Step content */}
            {children}
          </div>

          {/* Right side illustration */}
          <div className="hidden md:block relative">
            <div className="absolute inset-0 bg-gray-100 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm">
                <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-2">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div key={i} className="rounded-full bg-gray-200"></div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-3/4 h-3/4">
                {currentStep === 1 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 bg-orange-500 rounded-lg transform rotate-12"></div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-3/4 relative">
                      <div className="absolute inset-0 bg-gray-200 rounded-lg transform -rotate-6"></div>
                      <div className="absolute inset-0 bg-orange-500 rounded-lg transform rotate-3 translate-y-4"></div>
                      <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-orange-600 rounded-lg transform translate-x-4 translate-y-4"></div>
                    </div>
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 relative">
                      <div className="absolute top-0 left-0 w-full h-full bg-orange-500 rounded-lg"></div>
                    </div>
                  </div>
                )}
                {currentStep === 4 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 relative">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="40" fill="#f97316" />
                        <rect x="30" y="30" width="40" height="40" fill="#fff" />
                        <circle cx="50" cy="50" r="10" fill="#f97316" />
                      </svg>
                    </div>
                  </div>
                )}
                {currentStep === 5 && (
                  <div className="absolute inset-0">
                    <div className="w-full h-full bg-orange-100 rounded-lg overflow-hidden">
                      <div className="absolute inset-0">
                        <svg viewBox="0 0 1000 1000" className="w-full h-full opacity-50">
                          <path d="M0,500 Q250,300 500,500 T1000,500" fill="none" stroke="#f97316" strokeWidth="20" />
                          <path d="M0,600 Q250,400 500,600 T1000,600" fill="none" stroke="#f97316" strokeWidth="20" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Chat widget */}
      <div className="fixed bottom-4 right-4 z-50">
        <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-4 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
