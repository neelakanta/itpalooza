

function send_ping()  
	pin = 4
	status, temp, humi  = dht.read(pin)
	if status == dht.OK then
		temp = temp * 1.8 + 32
	    print("DHT Temperature: "..temp.." ".."Humidity: "..humi)
	elseif status == dht.ERROR_CHECKSUM then
	    print( "DHT Checksum error." )
	    return
	elseif status == dht.ERROR_TIMEOUT then
	    print( "DHT timed out." )
	    return
	end
    m:publish("/temp",temp,0,0)
    m:publish("/humi",humi,0,0)
    print(node.heap())
end

function subscribe_endpoint()  
    m:subscribe("/temp",0,function(conn)
		print("Successfully subscribed to data endpoint")
	end)
end

function mqtt_start()  
	m = mqtt.Client("itpalooza_esp8266", 120, "hgjhgife", "gJVyNjCoz4Ay")
	m:on("connect", function(con) print ("connected") end)
	m:on("offline", function(con) print ("offline") end)
    
	m:connect("54.196.24.81", 18644, 0, 0, function(con) 
        subscribe_endpoint()
        -- And then pings each 5000 milliseconds
        tmr.stop(6)
        tmr.alarm(6, 5000, 1, send_ping)
    end) 
end

print("Wifi IP: "..wifi.sta.getip()) 
mqtt_start()
