#!/bin/bash
cd "$(dirname "$0")"
echo "Starting SOL site..."
echo "Opening http://localhost:3000 in your browser"
(sleep 4 && open http://localhost:3000) &
npm run dev
