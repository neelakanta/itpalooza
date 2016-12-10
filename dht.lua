pin = 4

status, temp, humi, temp_dec, humi_dec = dht.read(pin)
if status == dht.OK then
    temp = temp * 1.8 + 32
    print("DHT Temperature:"..temp..";".."Humidity:"..humi)
elseif status == dht.ERROR_CHECKSUM then
    print( "DHT Checksum error." )
elseif status == dht.ERROR_TIMEOUT then
    print( "DHT timed out." )
end
