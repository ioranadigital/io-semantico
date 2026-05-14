export default function Footer() {
  return (
    <footer id="contacto" className="bg-gray-900 text-gray-300">
      <div className="container-fluid py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Branding */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-4">Resogar</h3>
            <p className="text-gray-400 font-light mb-4">
              Apartamentos de lujo en Madrid. Experiencias exclusivas en las zonas más prestigiosas.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/resogar" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://twitter.com/resogar" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 002.856-3.51 10.02 10.02 0 01-2.856.961 5.003 5.003 0 00-8.667 4.559 14.147 14.147 0 01-10.29-5.144 5.003 5.003 0 001.55 6.685 4.997 4.997 0 01-2.268-.616v.061a5.003 5.003 0 004.009 4.905 4.993 4.993 0 002.212.085 5.006 5.006 0 004.667 3.478 10.04 10.04 0 01-6.177 2.13c-.398 0-.794-.025-1.185-.074a14.134 14.134 0 007.666 2.247c9.2 0 14.206-7.604 14.206-14.206 0-.216-.005-.432-.015-.648a10.012 10.012 0 002.457-2.548z"/></svg>
              </a>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-white font-semibold mb-6">Servicios</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/#apartamentos-destacados" className="text-gray-400 hover:text-white transition-colors">Apartamentos</a></li>
              <li><a href="/#experiencias" className="text-gray-400 hover:text-white transition-colors">Experiencias</a></li>
              <li><a href="/checkout" className="text-gray-400 hover:text-white transition-colors">Reservas</a></li>
              <li><a href="/#contacto" className="text-gray-400 hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-white font-semibold mb-6">Empresa</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Sobre Nosotros</a></li>
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Carreras</a></li>
              <li><a href="/#contacto" className="text-gray-400 hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-6">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4 font-light">
              Suscríbete para ofertas exclusivas y novedades
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Tu email"
                className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-600"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all text-sm">
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm font-light mb-4 md:mb-0">
            © 2024 Resogar. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="/" className="text-gray-400 hover:text-white transition-colors">Privacidad</a>
            <a href="/" className="text-gray-400 hover:text-white transition-colors">Términos</a>
            <a href="/" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
