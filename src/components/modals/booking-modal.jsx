"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronRight, Check } from "lucide-react"
import { Button } from "../ui/button"

export function BookingModal({ experience, type, isOpen, onClose }) {
  const [step, setStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    experienceOption: "exact",
    date: "",
    dateRange: "",
    people: "2",
    comment: "",
    fullName: "",
    email: "",
    phone: "",
    bestTime: "morning",
  })

  const handleNext = () => { if (step < 3) setStep(step + 1) }
  const handlePrev = () => { if (step > 1) setStep(step - 1) }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      onClose()
      setStep(1)
      setIsSubmitted(false)
      setFormData({
        experienceOption: "exact",
        date: "",
        dateRange: "",
        people: "2",
        comment: "",
        fullName: "",
        email: "",
        phone: "",
        bestTime: "morning",
      })
    }, 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-[#f7f6f2] booking-modal rounded-t-3xl p-6 sm:p-8">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#e4e2dc] transition-colors"
              >
                <X className="w-6 h-6 text-[#0f2f24]" />
              </button>

              {!isSubmitted ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-8 mt-4">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-3xl font-bold text-[#0f2f24]">Request Booking</h2>
                      <div className="flex gap-1">
                        {[1, 2, 3].map((s) => (
                          <div
                            key={s}
                            className={`h-1 rounded-full transition-all ${s <= step ? "bg-[#0f2f24] w-8" : "bg-[#e4e2dc] w-2"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-[#2b2b2b] text-sm">Step {step} of 3</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Step 1 */}
                    {step === 1 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-4">Confirm Your Experience</h3>
                          <div className="flex items-center gap-3 p-4 bg-muted rounded-xl mb-6">
                            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                              <span className="text-primary-foreground text-lg">✓</span>
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">{experience.name}</p>
                              <p className="text-sm text-muted-foreground">{experience.category}</p>
                            </div>
                          </div>

                          <p className="text-foreground font-medium mb-3">Would you like:</p>
                          <div className="space-y-3">
                            <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                              <input
                                type="radio"
                                name="experienceOption"
                                value="exact"
                                checked={formData.experienceOption === "exact"}
                                onChange={handleInputChange}
                                className="w-4 h-4"
                              />
                              <span className="text-foreground">This exact experience</span>
                            </label>
                            <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                              <input
                                type="radio"
                                name="experienceOption"
                                value="similar"
                                checked={formData.experienceOption === "similar"}
                                onChange={handleInputChange}
                                className="w-4 h-4"
                              />
                              <span className="text-foreground">Something similar</span>
                            </label>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-4">When & Who</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">Preferred Date</label>
                              <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </div>

                            {type === "tour" && (
                              <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Number of People</label>
                                <select
                                  name="people"
                                  value={formData.people}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                  {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                                    <option key={n} value={n.toString()}>{n} {n===1?"person":"people"}</option>
                                  ))}
                                </select>
                              </div>
                            )}

                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">Additional Comments (Optional)</label>
                              <textarea
                                name="comment"
                                value={formData.comment}
                                onChange={handleInputChange}
                                placeholder="Any special requests or preferences?"
                                rows={3}
                                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3 */}
                    {step === 3 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <h3 className="text-lg font-semibold text-foreground mb-4">Your Details</h3>
                        <div className="space-y-4">
                          {["fullName","email","phone"].map((field) => (
                            <div key={field}>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                {field==="fullName"?"Full Name":field==="email"?"Email":"Phone / WhatsApp"}
                              </label>
                              <input
                                type={field==="email"?"email":field==="phone"?"tel":"text"}
                                name={field}
                                value={formData[field]}
                                onChange={handleInputChange}
                                placeholder={field==="fullName"?"John Doe":field==="email"?"john@example.com":"+1 (555) 000-0000"}
                                required
                                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </div>
                          ))}
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Best Time for Call</label>
                            <select
                              name="bestTime"
                              value={formData.bestTime}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                              <option value="morning">Morning (6am - 12pm)</option>
                              <option value="afternoon">Afternoon (12pm - 6pm)</option>
                              <option value="evening">Evening (6pm - 10pm)</option>
                              <option value="flexible">Flexible</option>
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Navigation */}
                    <div className="flex gap-3 pt-8">
                      <Button type="button" onClick={handlePrev} disabled={step===1} variant="outline" className="flex-1 border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed bg-transparent">Back</Button>
                      {step<3 ? (
                        <Button type="button" onClick={handleNext} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2">
                          Next <ChevronRight className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold flex items-center justify-center gap-2">
                          Request Booking & Callback
                        </Button>
                      )}
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay:0.2, type:"spring", stiffness:200 }} className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-primary"/>
                  </motion.div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Booking Requested!</h2>
                  <p className="text-muted-foreground mb-6">
                    We'll contact you shortly to confirm your {type==="car"?"car rental":"tour experience"}.
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">Check your email or WhatsApp for updates from our team.</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
