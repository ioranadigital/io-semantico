#!/usr/bin/env python3
"""
WordPress Publisher for esgarden
Publica contenidos en la REST API de WordPress como draft
"""

import json
import os
import sys
import base64
from pathlib import Path
from typing import Dict, Any

import requests
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv(Path(__file__).parent / ".env")

class WordPressPublisher:
    def __init__(self):
        self.wp_url = os.getenv("WP_URL")
        self.wp_user = os.getenv("WP_USER")
        self.wp_app_password = os.getenv("WP_APP_PASSWORD")
        self.publish_status = os.getenv("PUBLISH_STATUS", "draft")

        if not all([self.wp_url, self.wp_user, self.wp_app_password]):
            raise ValueError("Missing WordPress credentials in .env")

        # Configurar autenticación básica
        credentials = f"{self.wp_user}:{self.wp_app_password}"
        self.auth_header = "Basic " + base64.b64encode(credentials.encode()).decode()

    def publish_post(self, content: Dict[str, Any]) -> Dict[str, Any]:
        """
        Publica un post en WordPress

        Args:
            content: Dict con estructura {title, meta_description, content, schema}

        Returns:
            Respuesta de la API de WordPress
        """
        url = f"{self.wp_url}/wp-json/wp/v2/posts"

        headers = {
            "Authorization": self.auth_header,
            "Content-Type": "application/json",
        }

        payload = {
            "title": content.get("title", ""),
            "content": content.get("content", ""),
            "status": self.publish_status,
            "meta": {
                "meta_description": content.get("meta_description", ""),
                "schema_json": json.dumps(content.get("schema", {})),
            }
        }

        try:
            response = requests.post(url, json=payload, headers=headers, timeout=30)
            response.raise_for_status()

            result = response.json()
            print(f"✓ Post publicado: {result.get('title', 'N/A')} (ID: {result.get('id')})")
            return result

        except requests.exceptions.RequestException as e:
            print(f"✗ Error al publicar: {e}")
            if hasattr(e.response, 'text'):
                print(f"  Detalle: {e.response.text}")
            return {}

    def publish_batch(self, json_file: str) -> None:
        """
        Publica múltiples posts desde archivo JSON

        Args:
            json_file: Ruta al archivo JSON con lista de contenidos
        """
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                contents = json.load(f)

            if not isinstance(contents, list):
                contents = [contents]

            for idx, content in enumerate(contents, 1):
                print(f"\n[{idx}/{len(contents)}] Publicando: {content.get('title', 'Sin título')}")
                self.publish_post(content)

        except FileNotFoundError:
            print(f"✗ Archivo no encontrado: {json_file}")
            sys.exit(1)
        except json.JSONDecodeError:
            print(f"✗ JSON inválido en: {json_file}")
            sys.exit(1)

def main():
    if len(sys.argv) < 2:
        print("Uso: python wp_publisher.py <json_file>")
        print("Ejemplo: python wp_publisher.py content.json")
        sys.exit(1)

    json_file = sys.argv[1]

    try:
        publisher = WordPressPublisher()
        publisher.publish_batch(json_file)
        print("\n✓ Proceso completado")
    except ValueError as e:
        print(f"✗ Error de configuración: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
