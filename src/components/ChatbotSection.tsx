import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  User,
  Sparkles,
  FileCheck,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  Trash2,
} from 'lucide-react';
import { AnyVerificationReport, ChatMessage } from '../types';

interface ChatbotSectionProps {
  activeReport: AnyVerificationReport | null;
  onClearReportContext?: () => void;
}

export const ChatbotSection: React.FC<ChatbotSectionProps> = ({
  activeReport,
  onClearReportContext,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content:
        "Welcome to DeepGuard Forensic Intelligence. I am your specialized verification advisor. I can explain why an image, video, or document was classified as REAL, FAKE, or SUSPICIOUS, break down confidence scores, describe what Error Level Analysis (ELA) detected, or recommend institutional next steps. What would you like to investigate?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Context-specific suggested questions
  const suggestedQuestions = activeReport
    ? [
        `Why was ${activeReport.fileName} classified as ${activeReport.verdict}?`,
        `What does the ${activeReport.confidence}% confidence score mean technically?`,
        activeReport.fileType === 'document'
          ? 'Which specific areas of this document appear altered?'
          : activeReport.fileType === 'video'
          ? 'Which keyframes exhibited suspicious facial distortion?'
          : 'Can you explain the Error Level Analysis (ELA) anomaly score?',
        'What next steps do you recommend for official verification?',
      ]
    : [
        'How does EfficientNet-B4 distinguish real faces from AI generation?',
        'What is Error Level Analysis (ELA) and how does it detect tampering?',
        'Why can visual document analysis not guarantee legal validity?',
        'What are the most common signs of a deepfake video?',
      ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const chatHistory = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: chatHistory,
          currentContext: activeReport || null,
        }),
      });

      if (!response.ok) throw new Error('Chat API returned error');
      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: data.reply || 'No response generated.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        role: 'assistant',
        content:
          "DeepGuard Intelligence Core: I am currently unable to reach the neural explanation server. However, based on algorithmic forensic standards: Confidence scores represent statistical similarity against trained biometric datasets, not definitive legal proofs. High Error Level Analysis (ELA) differentials signify localized re-compression typically associated with photo editing.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Bot className="w-5 h-5 text-indigo-400" />
            <span>AI Forensic Verification Chatbot</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Grounded forensic reasoning powered by Gemini 3.8 Flash. Interprets confidence scores, anomalies, and verification caveats.
          </p>
        </div>

        {activeReport && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-800/80 text-xs">
            <FileCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-300 font-medium truncate max-w-[180px]">
              {activeReport.fileName}
            </span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                activeReport.verdict === 'FAKE' || activeReport.verdict === 'SUSPICIOUS'
                  ? 'bg-rose-950 text-rose-300 border-rose-800'
                  : 'bg-emerald-950 text-emerald-300 border-emerald-800'
              }`}
            >
              {activeReport.verdict}
            </span>
          </div>
        )}
      </div>

      {/* Active Context Banner */}
      {activeReport ? (
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start justify-between text-xs gap-3">
          <div className="flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200">Active Audit Context Loaded: </span>
              <span className="text-slate-400">
                The chatbot has access to {activeReport.fileName} ({activeReport.fileType.toUpperCase()}), classified as{' '}
                <strong className="text-slate-200">{activeReport.verdict}</strong> with{' '}
                <strong className="text-slate-200">{activeReport.confidence}%</strong> confidence.
              </span>
            </div>
          </div>
          {onClearReportContext && (
            <button
              onClick={onClearReportContext}
              className="text-[11px] text-slate-500 hover:text-slate-300 shrink-0 underline"
            >
              Clear Context
            </button>
          )}
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-slate-900/30 border border-slate-800/60 flex items-center gap-2 text-xs text-slate-400">
          <AlertCircle className="w-4 h-4 text-slate-500 shrink-0" />
          <span>No specific file report loaded. Ask general media forensics questions or run a scan first.</span>
        </div>
      )}

      {/* Chat Messages Log Terminal */}
      <div className="rounded-2xl bg-slate-900/50 border border-slate-800 overflow-hidden shadow-xl flex flex-col h-[540px]">
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs shadow-sm ${
                    isUser
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-indigo-400 border border-slate-700'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed space-y-1.5 ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-tr-sm'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-sm shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <div
                    className={`text-[10px] font-mono text-right ${
                      isUser ? 'text-indigo-200' : 'text-slate-500'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-indigo-400 border border-slate-700 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-pulse" />
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 text-xs text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.4s]" />
                <span className="font-mono text-[11px] ml-1">Analyzing forensic parameters...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompt Chips */}
        <div className="p-3 bg-slate-950/70 border-t border-slate-800/80">
          <div className="text-[11px] font-mono text-slate-500 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span>Suggested Investigations:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="text-left text-xs px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 transition-colors flex items-center gap-1 disabled:opacity-50"
              >
                <span>{q}</span>
                <ArrowRight className="w-3 h-3 text-slate-500 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="p-3 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask a question about the analysis, confidence scores, or document tampering..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputPrompt.trim()}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md shadow-indigo-600/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
