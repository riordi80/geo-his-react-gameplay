#!/bin/bash

# Script para alternar entre configuraciones local y production
# Proyecto: LearnGaming

case "$1" in
  "local")
    echo "🔧 Cambiando a configuración LOCAL..."

    # Copiar configuración local
    if [ ! -f ".env.local" ]; then
      echo "❌ Error: No existe el archivo .env.local"
      echo "   Crea el archivo .env.local con tus variables de entorno locales"
      exit 1
    fi

    cp .env.local .env

    echo "✅ Configuración LOCAL activada"
    echo "✅ Entorno: Desarrollo local"
    echo "✅ URL: http://localhost:5173"
    echo ""
    echo "💡 Para iniciar el servidor de desarrollo:"
    echo "   npm run dev"
    ;;

  "production")
    echo "🚀 Cambiando a configuración PRODUCTION..."

    # Copiar configuración production
    if [ ! -f ".env.production" ]; then
      echo "❌ Error: No existe el archivo .env.production"
      echo "   Crea el archivo .env.production con tus variables de entorno de producción"
      exit 1
    fi

    cp .env.production .env

    echo "✅ Configuración PRODUCTION activada"
    echo "✅ Entorno: Producción"
    echo "✅ URL: https://learngaming.pages.dev (o tu dominio personalizado)"
    echo ""
    echo "💡 Para hacer build para producción:"
    echo "   npm run build"
    echo ""
    echo "📋 PASOS PARA DESPLEGAR:"
    echo "   1. Ejecuta: npm run build"
    echo "   2. Sube la carpeta 'dist' a tu servidor de producción"
    echo "   3. Configura las variables de entorno en tu hosting"
    ;;

  *)
    echo "📋 Uso: ./switch-env.sh [local|production]"
    echo ""
    echo "Configuraciones disponibles:"
    echo "  local      - Desarrollo local (localhost:5173)"
    echo "  production - Producción"
    echo ""
    echo "📊 Estado actual:"

    if [ -f ".env" ]; then
      if grep -q "VITE_ENVIRONMENT=local" .env 2>/dev/null; then
        echo "  🔧 LOCAL - Desarrollo local (localhost:5173)"
      elif grep -q "VITE_ENVIRONMENT=production" .env 2>/dev/null; then
        echo "  🚀 PRODUCTION - Entorno de producción"
      else
        echo "  ❓ INDEFINIDO - No se detectó configuración válida"
      fi
    else
      echo "  ❌ NO CONFIGURADO - No existe archivo .env"
      echo ""
      echo "💡 Ejecuta './switch-env.sh local' o './switch-env.sh production' para configurar"
    fi

    echo ""
    echo "📁 Archivos de configuración:"

    if [ -f ".env" ]; then
      echo "  ✅ .env (actual)"
    else
      echo "  ❌ .env (no existe)"
    fi

    if [ -f ".env.local" ]; then
      echo "  ✅ .env.local (plantilla local)"
    else
      echo "  ⚠️  .env.local (no existe - crear desde .env.example)"
    fi

    if [ -f ".env.production" ]; then
      echo "  ✅ .env.production (plantilla producción)"
    else
      echo "  ⚠️  .env.production (no existe - crear desde .env.example)"
    fi

    if [ -f ".env.example" ]; then
      echo "  ✅ .env.example (plantilla de ejemplo)"
    else
      echo "  ⚠️  .env.example (no existe)"
    fi

    echo ""
    echo "💡 Tips:"
    echo "  - Los archivos .env.local y .env.production no se suben a git"
    echo "  - Usa .env.example como referencia para crear tus configuraciones"
    echo "  - Las variables deben empezar con VITE_ para ser accesibles en el código"
    ;;
esac
