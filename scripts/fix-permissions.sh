#!/bin/bash
# Fix macOS file permissions for node_modules to resolve EPERM errors

set -e

echo "🔧 Fixing file permissions for node_modules..."

# Get the project directory
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
  echo "⚠️  This script is designed for macOS. Skipping permission fixes."
  exit 0
fi

# Fix node_modules permissions
if [ -d "node_modules" ]; then
  echo "📦 Fixing node_modules permissions..."
  sudo chown -R "$(whoami)" node_modules 2>/dev/null || true
  chmod -R u+rw node_modules 2>/dev/null || true
  
  # Remove extended attributes (macOS quarantine)
  xattr -rc node_modules 2>/dev/null || true
  
  echo "✅ node_modules permissions fixed"
else
  echo "⚠️  node_modules not found. Run 'npm install' first."
fi

# Fix .next build directory if it exists
if [ -d ".next" ]; then
  echo "🔨 Fixing .next permissions..."
  sudo chown -R "$(whoami)" .next 2>/dev/null || true
  chmod -R u+rw .next 2>/dev/null || true
  xattr -rc .next 2>/dev/null || true
  echo "✅ .next permissions fixed"
fi

echo "✅ Permission fixes complete!"

