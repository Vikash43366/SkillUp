import React, { useState } from "react"

import { Card, CardContent } from "../components/ui/card.jsx"
import { Button } from "../components/ui/button.jsx"
import { Badge } from "../components/ui/badge.jsx"
import { Input } from "../components/ui/input.jsx"
import { Header } from "../components/ui/header.jsx"
import { Wallet, CreditCard, TrendingUp, TrendingDown, Plus, Minus, History, Gift } from "lucide-react"

export default function WalletPage() {
  const [showAddFunds, setShowAddFunds] = useState(false)
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [amount, setAmount] = useState("")
  const [selectedMethod, setSelectedMethod] = useState("credit")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [selectedWithdrawMethod, setSelectedWithdrawMethod] = useState("")

  const walletBalance = 1250
  const monthlyEarned = 320
  const monthlySpent = 180

  // Payment methods from banking settings
  const paymentMethods = [
    { id: "debit", name: "Debit Card", icon: <CreditCard className="w-4 h-4" />, last4: "8888", type: "card" },
    { id: "upi1", name: "UPI - Google Pay", icon: <CreditCard className="w-4 h-4" />, upiId: "alex@okicici", type: "upi" },
    { id: "bank1", name: "HDFC Bank", icon: <CreditCard className="w-4 h-4" />, accountNumber: "1234", type: "bank" },
  ]

  const transactions = [
    {
      id: 1,
      type: "earned",
      amount: 50,
      description: "Course Completion Bonus",
      date: "2 hours ago",
      category: "Reward",
    },
    {
      id: 2,
      type: "spent",
      amount: 150,
      description: "Modern JavaScript Mastery",
      date: "1 day ago",
      category: "Course",
    },
    {
      id: 3,
      type: "earned",
      amount: 25,
      description: "Daily Streak Bonus",
      date: "2 days ago",
      category: "Reward",
    },
    {
      id: 4,
      type: "spent",
      amount: 120,
      description: "UI/UX Design Fundamentals",
      date: "3 days ago",
      category: "Course",
    },
    {
      id: 5,
      type: "earned",
      amount: 100,
      description: "Referral Bonus",
      date: "1 week ago",
      category: "Reward",
    },
  ]

  const handleAddFunds = () => {
    if (amount && selectedMethod) {
      alert(`Adding ${amount} credits via ${paymentMethods.find(m => m.id === selectedMethod)?.name}`)
      setShowAddFunds(false)
      setAmount("")
    }
  }

  const handleWithdraw = () => {
    if (withdrawAmount && selectedWithdrawMethod) {
      alert(`Withdrawing ${withdrawAmount} credits via ${paymentMethods.find(m => m.id === selectedWithdrawMethod)?.name}`)
      setShowWithdraw(false)
      setWithdrawAmount("")
    }
  }

  const getTransactionIcon = (type) => {
    return type === "earned" ? (
      <Plus className="w-4 h-4 text-green-500" />
    ) : (
      <Minus className="w-4 h-4 text-red-500" />
    )
  }

  const getTransactionColor = (type) => {
    return type === "earned" ? "text-green-600" : "text-red-600"
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="Wallet" subtitle="Manage Credits" icon={<Wallet className="w-6 h-6 text-primary-foreground" />} />

      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Balance Overview */}
        <section className="mb-6">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Current Balance</h2>
                <Wallet className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold mb-4">{walletBalance} Credits</div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-green-300" />
                  <span>+{monthlyEarned} this month</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingDown className="w-4 h-4 text-red-300" />
                  <span>-{monthlySpent} this month</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Actions */}
        <section className="mb-6">
          <div className="grid grid-cols-2 gap-4">
            <Button
              className="h-16 bg-accent hover:bg-accent/90"
              onClick={() => setShowAddFunds(true)}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Credits
            </Button>
            <Button
              variant="outline"
              className="h-16 bg-red-400 hover:bg-red-500 text-white border-red-500 hover:border-red-600"
              onClick={() => setShowWithdraw(true)}
            >
              <Minus className="w-5 h-5 mr-2" />
              Withdraw
            </Button>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="mb-6">
          <h3 className="font-heading text-lg font-semibold text-card-foreground mb-4">Payment Methods</h3>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <Card key={method.id} className="cursor-pointer hover:bg-accent/5">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-card-foreground">{method.name}</h4>
                      {method.type === "card" && (
                        <p className="text-sm text-muted-foreground">•••• •••• •••• {method.last4}</p>
                      )}
                      {method.type === "upi" && (
                        <p className="text-sm text-muted-foreground">UPI ID: {method.upiId}</p>
                      )}
                      {method.type === "bank" && (
                        <p className="text-sm text-muted-foreground">Account: ••••{method.accountNumber}</p>
                      )}
                    </div>
                    <Badge variant="outline">
                      {method.type === "card" ? "Card" : method.type === "upi" ? "UPI" : "Bank"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Transactions */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-lg font-semibold text-card-foreground">Recent Transactions</h3>
            <Button variant="ghost" size="sm" onClick={() => alert("View all transactions")}>
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <Card key={transaction.id}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-card-foreground">{transaction.description}</h4>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{transaction.category}</span>
                        <span>•</span>
                        <span>{transaction.date}</span>
                      </div>
                    </div>
                    <div className={`text-right ${getTransactionColor(transaction.type)}`}>
                      <div className="font-semibold">
                        {transaction.type === "earned" ? "+" : "-"}{transaction.amount}
                      </div>
                      <div className="text-xs text-muted-foreground">Credits</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Add Funds Modal */}
        {showAddFunds && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardContent className="p-6">
                <h3 className="font-heading text-lg font-semibold mb-4">Add Credits</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Amount (Credits)
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Payment Method
                    </label>
                    <div className="space-y-2">
                      {paymentMethods.map((method) => (
                        <label key={method.id} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={selectedMethod === method.id}
                            onChange={(e) => setSelectedMethod(e.target.value)}
                            className="text-primary"
                          />
                          <span className="text-sm">{method.name} •••• {method.last4}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" className="flex-1" onClick={() => setShowAddFunds(false)}>
                      Cancel
                    </Button>
                    <Button className="flex-1" onClick={handleAddFunds}>
                      Add Credits
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Withdraw Modal */}
        {showWithdraw && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardContent className="p-6">
                <h3 className="font-heading text-lg font-semibold mb-4">Withdraw Credits</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Amount (Credits)
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Withdraw Method
                    </label>
                    <div className="space-y-2">
                      {paymentMethods.map((method) => (
                        <label key={method.id} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="withdrawMethod"
                            value={method.id}
                            checked={selectedWithdrawMethod === method.id}
                            onChange={(e) => setSelectedWithdrawMethod(e.target.value)}
                            className="text-primary"
                          />
                          <span className="text-sm">
                            {method.name} - {
                              method.type === "card" ? `•••• ${method.last4}` :
                              method.type === "upi" ? method.upiId :
                              `••••${method.accountNumber}`
                            }
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" className="flex-1" onClick={() => setShowWithdraw(false)}>
                      Cancel
                    </Button>
                    <Button className="flex-1" onClick={handleWithdraw}>
                      Withdraw
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      
    </div>
  )
}
