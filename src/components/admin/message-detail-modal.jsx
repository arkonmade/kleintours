"use client";

import { useState } from "react";
import { X, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MessageDetailModal({ isOpen, message, onClose }) {
  const [reply, setReply] = useState("");
  const [hasReplied, setHasReplied] = useState(false);

  const handleSendReply = () => {
    if (reply.trim()) {
      setHasReplied(true);
      setTimeout(() => {
        onClose();
        setReply("");
        setHasReplied(false);
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-50 border border-border">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-background">
          <h2 className="text-2xl font-bold text-foreground">
            Message Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Sender Info */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">From</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <span className="text-2xl font-bold text-primary/30">
                  {message.senderName.charAt(0)}
                </span>
                <div>
                  <p className="font-semibold text-foreground">
                    {message.senderName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {message.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <Clock className="w-4 h-4" />
                <p>{new Date(message.date).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Message
            </h3>
            <div className="p-4 rounded-lg border-2 border-border bg-muted/30">
              <p className="font-semibold text-foreground mb-3">
                {message.subject}
              </p>
              <p className="text-foreground leading-relaxed">
                {message.message}
              </p>
            </div>
          </div>

          {/* Reply Section */}
          {!hasReplied ? (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Send Reply
              </h3>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type your reply here..."
                rows={5}
                className="w-full px-4 py-3 rounded-lg border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none mb-4"
              />
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button onClick={handleSendReply} disabled={!reply.trim()}>
                  <MessageCircle className="w-4 h-4" />
                  Send Reply
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-green-50 border-2 border-green-200">
              <p className="text-green-700 font-semibold">
                Reply sent successfully!
              </p>
              <p className="text-sm text-green-600">
                The customer has been notified.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
