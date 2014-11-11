# encoding: utf-8

if ARGV.size != 1
  puts 'Utilização: `ruby scripts/convert-bikepoa-to-json.rb <ARQUIVO-CSV> > <ARQUIVO_JSON>`'
  exit 1
end

require 'csv'
require 'json'

data = []
CSV.foreach(ARGV[0], col_sep: ';', headers: true) do |row|
  data << {
    name:      row['nome'].gsub('_', ' '),
    latitude:  row['LATITUDE'].gsub(',', '.').to_f,
    longitude: row['LONGITUDE'].gsub(',', '.').to_f
  }
end

puts "#{data.to_json}"
