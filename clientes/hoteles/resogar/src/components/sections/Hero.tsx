export default function Hero() {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat overflow-hidden pt-20"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&q=80")'
      }}
    >
      {/* Overlay oscuro para mejor legibilidad */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Animated accent shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container-fluid h-full flex flex-col items-center justify-center">
        {/* Badge */}
        <div className="mb-6 inline-block">
          <span className="px-4 py-2 bg-blue-600/20 border border-blue-400 text-blue-200 rounded-full text-sm font-semibold">
            ✨ Apartamentos Premium en Centro
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white text-center mb-6 max-w-4xl leading-tight">
          Departamentos de <span className="font-semibold">Lujo</span> en el Centro de Salamanca
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-300 text-center mb-12 max-w-2xl font-light">
          Experiencias exclusivas en las zonas más privilegiadas de la capital
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all">
            Explorar Apartamentos
          </button>
          <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all">
            Ver Ofertas
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-700">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">3</div>
            <p className="text-gray-400 mt-1 text-sm">Ubicaciones Premium</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">4.9★</div>
            <p className="text-gray-400 mt-1 text-sm">Valoración Media</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">500+</div>
            <p className="text-gray-400 mt-1 text-sm">Huéspedes Felices</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLineCap="round" strokeLineJoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
