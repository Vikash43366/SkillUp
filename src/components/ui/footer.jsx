import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "./button.jsx"
import { BookOpen, Search, Wallet, FileText, User } from "lucide-react"

export function Footer() {
  const location = useLocation()

  const navItems = [
    { path: "/", icon: BookOpen, label: "Home" },
    { path: "/courses", icon: Search, label: "Courses" },
    { path: "/wallet", icon: Wallet, label: "Wallet" },
    { path: "/tests", icon: FileText, label: "Tests" },
    { path: "/profile", icon: User, label: "Profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <Link key={item.path} to={item.path}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`flex-col space-y-1 h-auto py-2 px-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'text-violet-600' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${
                    isActive ? 'text-violet-600' : 'text-muted-foreground'
                  }`} />
                  <span className="text-xs">{item.label}</span>
                </Button>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
