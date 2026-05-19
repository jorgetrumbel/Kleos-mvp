/**
 * Athletica Color Palette - Use these colors consistently across all screens:
 *
 * Primary Colors:
 * - Dark Background: #1a3a45 (dark teal)
 * - Card Background: rgba(15,23,42,0.6) with backdrop-blur (frosted glass)
 * - Primary Green: #c4ff0e (lime green) - for highlights and active states
 * - Gradient: from-[#4ade80] to-[#a3e635] - for primary CTA buttons
 *
 * Text Colors:
 * - Primary Text: #ffffff (white)
 * - Secondary Text: #9ca3af (gray)
 * - Accent Text: #38bdf8 (cyan blue) - for links
 *
 * Input/UI Elements:
 * - Input Background: rgba(30,41,59,0.5) (dark slate with transparency)
 * - Border: rgba(255,255,255,0.1) or #374151 (subtle borders)
 * - Success/Checkbox: #65a30d (green)
 *
 * Effects:
 * - Backdrop blur: 8px
 * - Drop shadows: 0px_0px_12.5px_rgba(163,230,53,0.4) for glow effects
 */

import { useState } from 'react';
import svgPaths from '../../imports/Login/svg-e8rmduv2xl';
import imgLogin from 'figma:asset/6756315561075879ccf2bce0b6a9eb51f8b06c22.png';
import imgLogo from 'figma:asset/04d9e88d6c46fe3df8b3455953366bd47a216bc4.png';

interface LoginProps {
  onLogin: (role: 'coach' | 'athlete') => void;
  onCreateAccount: () => void;
}

export default function Login({ onLogin, onCreateAccount }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const TEST_USERS = [
    { email: 'coach@coach', password: '1234', role: 'coach' as const },
    { email: 'athlete@athlete', password: '1234', role: 'athlete' as const },
  ];

  const handleSubmit = () => {
    setError('');
    const user = TEST_USERS.find(
      (u) => u.email === email.trim() && u.password === password
    );
    if (user) {
      onLogin(user.role);
    } else {
      setError('Email o contraseña incorrectos. Usá coach@coach o athlete@athlete con contraseña 1234.');
    }
  };

  return (
    <div className="content-stretch flex items-center justify-center px-2 sm:px-4 py-2 relative size-full bg-background">
      {/* Background Image */}
      <img
        alt=""
        className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
        src={imgLogin}
      />

      {/* Main Container */}
      <div className="drop-shadow-[0px_25px_25px_rgba(0,0,0,0.25)] w-full max-w-[448px] min-h-[812px] overflow-clip relative rounded-[32px] sm:rounded-[48px]">
        {/* iOS Home Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col h-[14px] items-center justify-end pb-2 w-32">
          <div className="bg-[rgba(255,255,255,0.4)] h-[6px] rounded-full w-32" />
        </div>

        {/* Gradient Blur Effect */}
        <div
          className="absolute blur-[30px] inset-[70%_-10%_-10%_-10%]"
          style={{
            backgroundImage: "radial-gradient(ellipse at center bottom, rgba(52,211,153,0.25) 0%, rgba(5,150,105,0.1) 40%, rgba(5,150,105,0) 80%)"
          }}
        />

        {/* Header Logo Section */}
        <div className="absolute top-8 sm:top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="h-[70px] sm:h-[83px] w-[160px] sm:w-[192px] mb-3 sm:mb-4">
            <img alt="Athletica Logo" className="w-full h-full object-contain" src={imgLogo} />
          </div>
          <div className="font-['Montserrat',sans-serif] font-bold italic text-[26px] sm:text-[30px] text-white tracking-[3px] uppercase">
            ATHLETICA
          </div>
        </div>

        {/* Login Card */}
        <div className="absolute left-4 sm:left-6 right-4 sm:right-6 top-[190px] sm:top-[216px] backdrop-blur-[8px] bg-[rgba(15,23,42,0.6)] rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 border border-[rgba(255,255,255,0.1)] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.8)]">
          {/* Welcome Heading */}
          <div className="mb-2">
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xl sm:text-2xl text-white">
              Bienvenido/a
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-6 sm:mb-8">
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm text-[#9ca3af] leading-5">
              ¿Estás listo para seguir con tu<br />propósito?
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4 sm:space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-xs sm:text-sm text-white">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="carlos@coach.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 sm:pl-12 pr-4 py-3 sm:py-4 bg-[rgba(30,41,59,0.5)] rounded-xl sm:rounded-2xl border-0 text-sm sm:text-base text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 20 20">
                    <path
                      d={svgPaths.pe78580}
                      stroke="#9CA3AF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.66667"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-xs sm:text-sm text-white">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="password123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 sm:pl-12 pr-11 sm:pr-12 py-3 sm:py-4 bg-[rgba(30,41,59,0.5)] rounded-xl sm:rounded-2xl border-0 text-sm sm:text-base text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 20 20">
                    <path
                      d={svgPaths.p22a3d300}
                      stroke="#9CA3AF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.66667"
                    />
                  </svg>
                </div>
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 20 20">
                    <path
                      d={svgPaths.pfaa02c0}
                      stroke="#9CA3AF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.66667"
                    />
                    <path
                      d={svgPaths.p209a5800}
                      stroke="#9CA3AF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.66667"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between px-1">
              <button
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center gap-1.5 sm:gap-2"
              >
                <div className={`w-4 h-4 rounded ${rememberMe ? 'bg-[#65a30d]' : 'bg-[rgba(30,41,59,0.5)] border border-[#374151]'} flex items-center justify-center`}>
                  {rememberMe && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                      <path
                        d={svgPaths.pf079980}
                        fill="white"
                      />
                    </svg>
                  )}
                </div>
                <span className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[10px] sm:text-xs text-white">
                  Recordarme
                </span>
              </button>
              <button className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[10px] sm:text-xs text-[#38bdf8] hover:underline">
                Olvidé mi contraseña?
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-[#4ade80] to-[#a3e635] rounded-full py-3 sm:py-4 flex items-center justify-center gap-2 drop-shadow-[0px_0px_12.5px_rgba(163,230,53,0.4)] hover:opacity-90 transition-opacity"
            >
              <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base sm:text-lg text-black">
                Iniciar sesión
              </span>
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24">
                <path
                  d={svgPaths.p20773700}
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/40 border border-red-500/40 rounded-xl px-4 py-3 text-center">
                <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-red-300 leading-5">
                  {error}
                </p>
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center py-3 sm:py-4">
              <div className="flex-1 border-t border-[#374151]" />
              <span className="px-3 sm:px-4 font-['Plus_Jakarta_Sans',sans-serif] text-[10px] sm:text-xs text-[#6b7280] uppercase tracking-wider">
                o continuar con
              </span>
              <div className="flex-1 border-t border-[#374151]" />
            </div>

            {/* Social Buttons */}
            <div className="space-y-2.5 sm:space-y-3">
              {/* Apple Button */}
              <button className="w-full bg-[rgba(30,41,59,0.5)] border border-[rgba(55,65,81,0.5)] rounded-xl sm:rounded-2xl py-3 sm:py-3.5 flex items-center justify-center gap-2 sm:gap-3 hover:bg-[rgba(30,41,59,0.7)] transition-colors">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24">
                  <path
                    d={svgPaths.pd43ee00}
                    fill="white"
                  />
                </svg>
                <span className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-xs sm:text-sm text-white">
                  Continuar con Apple
                </span>
              </button>

              {/* Google Button */}
              <button className="w-full bg-[rgba(30,41,59,0.5)] border border-[rgba(55,65,81,0.5)] rounded-xl sm:rounded-2xl py-3 sm:py-3.5 flex items-center justify-center gap-2 sm:gap-3 hover:bg-[rgba(30,41,59,0.7)] transition-colors">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24">
                  <path d={svgPaths.p938c580} fill="#4285F4" />
                  <path d={svgPaths.pf327680} fill="#34A853" />
                  <path d={svgPaths.p281c5f00} fill="#FBBC05" />
                  <path d={svgPaths.p2812ea00} fill="#EA4335" />
                </svg>
                <span className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-xs sm:text-sm text-white">
                  Continuar con Google
                </span>
              </button>
            </div>

            {/* Footer Link */}
            <div className="text-center pt-3 sm:pt-4">
              <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm text-[#9ca3af]">
                ¿Todavía no tenés cuenta?{' '}
                <button
                  onClick={onCreateAccount}
                  className="font-bold text-[#a3e635] border-b-2 border-[#a3e635] hover:opacity-80 transition-opacity"
                >
                  Crear cuenta
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}