import { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Building, User, MessageSquare, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    useCase: 'banking',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Corporate or official email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.organization.trim()) {
      errs.organization = 'Organization or institution name is required.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please describe your telemetry deployment needs.';
    } else if (formData.message.length < 15) {
      errs.message = 'Message must be at least 15 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));

    const id = 'VX-PILOT-' + Math.floor(100000 + Math.random() * 900000);
    setTicketId(id);
    setIsSubmitting(false);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#06b6d4', '#3b82f6', '#8b5cf6']
      });
    } catch {}
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      organization: '',
      useCase: 'banking',
      message: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-20 sm:py-24 relative overflow-hidden bg-[#050816]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
            <span>ENTERPRISE ONBOARDING & PILOT</span>
            <span aria-hidden="true">·</span>
            <span>CONNECT WITH RETRYAVENGERS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Deploy VOXDIO AI In Your Infrastructure
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Schedule an enterprise POC or request on-premise air-gapped container evaluation for your organization.
          </p>
        </div>

        {/* Form Container */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-2xl relative overflow-hidden">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-5 animate-in fade-in">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-cyan-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                  DISPATCH CONFIRMED · {ticketId}
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Pilot Request Dispatched
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{formData.name}</span>. Team RETRYAVENGERS will review your request for{' '}
                  <span className="text-cyan-300 font-semibold">{formData.organization}</span> and provision sandbox API credentials within 4 business hours.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikram Malhotra"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                      errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-red-400">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Work / Official Email *</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="v.malhotra@bankcorp.in"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                      errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-red-400">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Organization */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Organization / Institution *</span>
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Reserve Bank of India / Bharti Airtel"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                      errors.organization ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                    }`}
                  />
                  {errors.organization && <p className="text-[11px] text-red-400">{errors.organization}</p>}
                </div>

                {/* Primary Use-Case */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Primary Defense Use-Case</span>
                  </label>
                  <select
                    value={formData.useCase}
                    onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 cursor-pointer"
                  >
                    <option value="banking">Banking & Treasury Wire Transfer Security</option>
                    <option value="telecom">Telecommunications Carrier SIP Filtering</option>
                    <option value="callcenter">Contact Center Customer Authentication</option>
                    <option value="government">Government & Defense Public Safety Dispatch</option>
                    <option value="enterprise">Corporate Executive Whaling Protection</option>
                    <option value="academic">Academic & Forensic Research Partnership</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Deployment Requirements & Audio Volumes *</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail your PBX carrier trunk setup, expected concurrent voice channels, or compliance constraints..."
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                    errors.message ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                  }`}
                />
                {errors.message && <p className="text-[11px] text-red-400">{errors.message}</p>}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 hover:from-cyan-300 hover:to-blue-400 transition-all shadow-xl shadow-cyan-500/25 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Transmitting Encrypted Dispatch...</span>
                ) : (
                  <>
                    <span>Request Enterprise Pilot & API Key</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-slate-500">
                Data transmissions are protected with AES-256 in transit. Zero audio storage policy enforced.
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
