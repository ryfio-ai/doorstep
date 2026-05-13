// src/components/student/EduBot.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Image as ImageIcon, Sparkles, Brain, Target, Calendar, BarChart2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useGamification } from '../../context/GamificationContext';
import { supabase } from '../../lib/supabase';
import OpenAI from 'openai';

const EduBot: React.FC = () => {
  const { studentProfile } = useAuth();
  const { stats, earnRewards } = useGamification();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const openai = apiKey ? new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true 
  }) : null;

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Load conversation history or start with welcome message
      loadHistory();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadHistory = async () => {
    if (!studentProfile) return;
    
    const { data } = await supabase
      .from('ai_conversations')
      .select('messages')
      .eq('student_id', studentProfile.id)
      .single();
    
    if (data && data.messages && data.messages.length > 0) {
      setMessages(data.messages);
    } else {
      setMessages([
        {
          role: 'assistant',
          content: `Hi ${studentProfile.full_name || 'there'}! I'm EduBot, your AI learning assistant. How can I help you today?`,
          timestamp: new Date().toISOString()
        }
      ]);
    }
  };

  const saveHistory = async (newMessages: any[]) => {
    if (!studentProfile) return;
    
    await supabase
      .from('ai_conversations')
      .upsert({
        student_id: studentProfile.id,
        messages: newMessages,
        updated_at: new Date().toISOString()
      }, { onConflict: 'student_id' });
  };

  const handleSendMessage = async (e?: React.FormEvent, customPrompt?: string) => {
    e?.preventDefault();
    const text = customPrompt || input;
    if (!text.trim() || loading) return;

    const userMessage = { role: 'user', content: text, timestamp: new Date().toISOString() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    if (!openai) {
      setMessages([...updatedMessages, { 
        role: 'assistant', 
        content: "I'm sorry, I'm currently not connected to the AI server. Please ask your administrator to set up the OpenAI API key.",
        timestamp: new Date().toISOString()
      }]);
      setLoading(false);
      return;
    }

    try {
      const systemPrompt = `You are EduBot, a world-class AI learning assistant for திறனொளி, a doorstep education platform.
      Student Info: Name: ${studentProfile?.full_name}, Grade: ${studentProfile?.grade}, Board: ${studentProfile?.school_board}.
      Tone: Friendly, encouraging, simple language. Use Tamil if the student uses Tamil.
      Tasks: 
      1. Course Recommender: Suggest courses based on profile.
      2. Doubt Solver: Explain concepts simply with examples.
      3. Study Planner: Create schedules based on exam dates.
      4. Progress Analyser: Give tips based on learning history.
      Always encourage asking their personal trainer for deeper understanding. Never give direct homework answers, instead provide a step-by-step approach.`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          ...updatedMessages.map(m => ({ role: m.role, content: m.content }))
        ],
      });

      const botContent = response.choices[0].message.content;
      const botMessage = { 
        role: 'assistant', 
        content: botContent, 
        timestamp: new Date().toISOString() 
      };
      
      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);
      saveHistory(finalMessages);

      // Reward for engagement
      if (messages.length % 5 === 0) {
        await earnRewards(2, 10, 'Engagement with EduBot');
      }

    } catch (error) {
      console.error('EduBot Error:', error);
      setMessages([...updatedMessages, { 
        role: 'assistant', 
        content: "I'm sorry, I'm having a bit of a brain freeze. Can you try again?",
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { label: 'Recommend a course', icon: Sparkles, prompt: 'Can you recommend a course for me based on my profile?' },
    { label: 'Ask a doubt', icon: Brain, prompt: 'I have a doubt in my subjects.' },
    { label: 'Create study plan', icon: Calendar, prompt: 'Can you help me create a study plan for my upcoming exams?' },
    { label: 'My progress report', icon: BarChart2, prompt: 'How am I progressing in my courses?' },
  ];

  return (
    <div className="fixed bottom-[100px] right-6 z-50">
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg flex items-center justify-center relative group overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="flex flex-col items-center"
            >
              <MessageCircle size={28} />
              <span className="text-[8px] font-bold mt-[-2px]">EDUBOT</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Pulse effect */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full border-2 border-orange-400 animate-ping opacity-25" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, x: 20 }}
            className="absolute bottom-20 right-0 w-[380px] h-[520px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-100"
          >
            {/* Header */}
            <div className="bg-navy-900 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm">EduBot</h3>
                  <p className="text-[10px] text-orange-200">AI Learning Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {messages.length === 1 && (
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => handleSendMessage(undefined, action.prompt)}
                      className="p-3 bg-white border border-gray-100 rounded-xl hover:border-orange-200 hover:bg-orange-50 transition-all text-left flex flex-col gap-2 group"
                    >
                      <action.icon size={16} className="text-orange-500 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-medium text-gray-700">{action.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      m.role === 'user'
                        ? 'bg-orange-500 text-white rounded-tr-none'
                        : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form 
              onSubmit={handleSendMessage}
              className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
            >
              <button 
                type="button"
                className="p-2 text-gray-400 hover:text-orange-500 transition-colors"
              >
                <ImageIcon size={20} />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your doubt here..."
                className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2 bg-orange-500 text-white rounded-full disabled:opacity-50 hover:bg-orange-600 transition-colors"
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EduBot;
