export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-4">Resogar</h3>
            <p className="text-sm text-gray-600">
              Alquila nuestros apartamentos de lujo en el centro histórico de Salamanca.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Enlaces</h3>
            <ul className="text-sm space-y-2 text-gray-600">
              <li><a href="/" className="hover:text-amber-600">Home</a></li>
              <li><a href="/apartamentos" className="hover:text-amber-600">Apartamentos</a></li>
              <li><a href="/contacto" className="hover:text-amber-600">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Políticas</h3>
            <ul className="text-sm space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-amber-600">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-amber-600">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-amber-600">Política de Cancelación</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
          <p>© 2026 Resogar. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
