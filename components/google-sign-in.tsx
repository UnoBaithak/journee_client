"use client"

import { useEffect, useRef } from "react"
import Script from "next/script"

interface GoogleSignInProps {
  text: string,
  onSuccess: (response: any) => void
}

export default function GoogleSignIn({ text, onSuccess }: GoogleSignInProps) {
  const googleSignInButtonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize Google Sign-In when the script is loaded
    const initializeGoogleSignIn = () => {
      if (window.google && googleSignInButtonRef.current) {
        try {
          window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID", // Replace with your actual client ID
            login_uri: "http://localhost:8080/api/auth/google-callback",
            ux_mode: "redirect"
          })

          window.google.accounts.id.renderButton(googleSignInButtonRef.current, {
            type: "standard",
            theme: "outline",
            size: "large",
            text: text,
            shape: "rectangular",
            logo_alignment: "left",
            width: googleSignInButtonRef.current.clientWidth,
          })
        } catch (error) {
          console.error("Error initializing Google Sign-In:", error)
        }
      }
    }

    // If the Google API is already loaded, initialize immediately
    if (window.google?.accounts) {
      initializeGoogleSignIn()
    }

    // Add event listener for when the script loads
    window.addEventListener("google-loaded", initializeGoogleSignIn)

    return () => {
      window.removeEventListener("google-loaded", initializeGoogleSignIn)
    }
  }, [onSuccess])

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        async
        defer
        onLoad={() => window.dispatchEvent(new Event("google-loaded"))}
      />
      <div className="w-full flex justify-center">
        <div ref={googleSignInButtonRef} className="w-full"></div>
      </div>
    </>
  )
}

// Extend the Window interface to include the google property
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void
          renderButton: (element: HTMLElement, options: any) => void
          prompt: () => void
        }
      }
    }
  }
}
