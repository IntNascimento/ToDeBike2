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

  vehicles = %w( AUTO TAXI LOTACAO ONIBUS_URB ONIBUS_MET ONIBUS_INT CAMINHAO MOTO CARROCA OUTRO ).map do |type|
    type if row[type].to_i > 0
  end

  data << {
    latitude:     row['LATITUDE'].gsub(',', '.').to_f,
    longitude:    row['LONGITUDE'].gsub(',', '.').to_f,
    fatal:        (row['FATAIS'].to_i > 0),
    injuried:     row['FERIDOS'].to_i,
    type:         row['TIPO_ACID'],
    address:      row['LOCAL_VIA'],
    region:       row['REGIAO'],
    date:         row['DATA_HORA'].split.first,
    time:         row['DATA_HORA'].split.last,
    day_or_night: row['NOITE_DIA'],
    vehicles:     vehicles.compact
  }
end

puts data.to_json
