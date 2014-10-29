# encoding: utf-8

if ARGV.size != 1
  puts 'Utilização: `ruby scripts/convert-accidents-to-json.rb <ARQUIVO-CSV> > <ARQUIVO_JSON>`'
  exit 1
end

require 'csv'
require 'json'

data = []
CSV.foreach(ARGV[0], col_sep: ';', headers: true) do |row|
  next if row['BICICLETA'].to_i == 0

  data << {
    latitude:  row['LATITUDE'].gsub(',', '.').to_f,
    longitude: row['LONGITUDE'].gsub(',', '.').to_f
  }
end

puts "#{data.to_json}"