echo "🔄 Aguardando o banco ficar disponível..."

until php artisan migrate --seed; do
  echo "⏳ Banco não está pronto ainda. Tentando novamente em 3 segundos..."
  sleep 3
done

echo "✅ Migrations e seeders aplicados com sucesso."

php artisan serve --host=0.0.0.0 --port=4040
