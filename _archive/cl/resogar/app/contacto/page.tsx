export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Contacto</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">¿Tienes preguntas?</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-1">Email</h3>
              <a href="mailto:info@resogar.com" className="text-amber-600 hover:underline">
                info@resogar.com
              </a>
            </div>

            <div>
              <h3 className="font-bold mb-1">Teléfono</h3>
              <a href="tel:+34923123456" className="text-amber-600 hover:underline">
                +34 923 123 456
              </a>
            </div>

            <div>
              <h3 className="font-bold mb-1">Ubicación</h3>
              <p className="text-gray-600">
                Salamanca, Centro Histórico<br />
                España
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2">Horario de atención</h3>
              <p className="text-gray-600 text-sm">
                Lunes a Viernes: 9:00 - 18:00<br />
                Sábados: 10:00 - 14:00<br />
                Domingos: Cerrado
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Envíanos un mensaje</h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre</label>
              <input
                type="text"
                required
                className="w-full border rounded px-3 py-2"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                required
                className="w-full border rounded px-3 py-2"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Asunto</label>
              <input
                type="text"
                required
                className="w-full border rounded px-3 py-2"
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mensaje</label>
              <textarea
                required
                rows={5}
                className="w-full border rounded px-3 py-2"
                placeholder="Tu mensaje aquí..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg transition"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
