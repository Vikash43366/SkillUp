import React from "react"
import { Button } from "./button.jsx"
import { Badge } from "./badge.jsx"
import { Bell, Wallet, Star, CreditCard, Calendar, Info } from "lucide-react"
import { Link } from "react-router-dom"

export function Header({ title, subtitle, icon, rightAction }) {
  const [showNotifications, setShowNotifications] = React.useState(false)
  const notificationRef = React.useRef(null)

  const notifications = [
    { id: 1, icon: <Star className="w-4 h-4 text-yellow-500" />, title: "New achievement unlocked", time: "2m ago" },
    { id: 2, icon: <Calendar className="w-4 h-4 text-blue-500" />, title: "Upcoming test tomorrow", time: "1h ago" },
    { id: 3, icon: <CreditCard className="w-4 h-4 text-emerald-600" />, title: "Wallet credited: 50 credits", time: "Yesterday" },
    { id: 4, icon: <Info className="w-4 h-4 text-purple-600" />, title: "Course update: React Patterns", time: "2d ago" },
    { id: 5, icon: <Star className="w-4 h-4 text-yellow-500" />, title: "Perfect score on JavaScript Quiz", time: "3d ago" },
    { id: 6, icon: <Calendar className="w-4 h-4 text-blue-500" />, title: "New course assignment posted", time: "4d ago" },
    { id: 7, icon: <CreditCard className="w-4 h-4 text-emerald-600" />, title: "Monthly bonus: 100 credits", time: "5d ago" },
    { id: 8, icon: <Info className="w-4 h-4 text-purple-600" />, title: "System maintenance scheduled", time: "1w ago" },
    { id: 9, icon: <Star className="w-4 h-4 text-yellow-500" />, title: "Course completion certificate ready", time: "1w ago" },
    { id: 10, icon: <Calendar className="w-4 h-4 text-blue-500" />, title: "Weekly progress report available", time: "1w ago" },
    { id: 11, icon: <CreditCard className="w-4 h-4 text-emerald-600" />, title: "Referral bonus earned: 25 credits", time: "2w ago" },
    { id: 12, icon: <Info className="w-4 h-4 text-purple-600" />, title: "New features added to dashboard", time: "2w ago" },
    { id: 13, icon: <Star className="w-4 h-4 text-yellow-500" />, title: "Top performer this month", time: "2w ago" },
    { id: 14, icon: <Calendar className="w-4 h-4 text-blue-500" />, title: "Course deadline reminder", time: "3w ago" },
    { id: 15, icon: <CreditCard className="w-4 h-4 text-emerald-600" />, title: "Payment processed successfully", time: "3w ago" },
  ]

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }
    
    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showNotifications])

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">{icon}</div>
            <div>
              <h1 className="font-heading text-xl font-bold text-card-foreground">{title}</h1>
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link to="/wallet">
              <Button variant="ghost" size="sm" className="flex items-center space-x-1 px-2">
                <Wallet className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">2,450</span>
              </Button>
            </Link>
            <div className="relative" ref={notificationRef}>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full relative"
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Open notifications"
              >
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-destructive">
                  15
                </Badge>
              </Button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
                  <div className="p-3 border-b border-border">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-card-foreground">Notifications</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowNotifications(false)}
                        className="h-auto p-1 text-xs"
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                  <div className="divide-y divide-border max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="flex items-start space-x-3 p-3 hover:bg-muted/50 transition-colors">
                        <div className="mt-0.5">{n.icon}</div>
                        <div className="flex-1">
                          <p className="text-sm text-card-foreground">{n.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {rightAction}
          </div>
        </div>
      </div>
    </header>
  )
}
