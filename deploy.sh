#!/bin/bash

BUCKET_NAME="mardev.es"
BUILD_DIR="dist"

echo "Ejecutando build..."
npm run build

echo "Borrando index.html..."
aws s3 rm s3://$BUCKET_NAME/index.html

echo "Borrando contenido en assets/..."
aws s3 rm s3://$BUCKET_NAME/assets --recursive

echo "Subiendo nuevos archivos (sin tocar uploads)..."
aws s3 sync $BUILD_DIR s3://$BUCKET_NAME --delete --exclude "uploads/*"

echo "Despliegue completado, uploads intactos."

DISTRIBUTION_ID="E2QBE13TVSAYH4"

echo "Invalidando cache en CloudFront..."
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

echo "Invalidación enviada. Los cambios se propagarán en unos minutos."
