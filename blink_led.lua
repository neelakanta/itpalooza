-- https://odd-one-out.serek.eu/esp8266-nodemcu-getting-started-hello-world/

local value = gpio.LOW

function toggleLED ()
    if value == gpio.LOW then
        value = gpio.HIGH
        gpio.write(5,gpio.LOW)
        gpio.write(6,gpio.HIGH)
    else
        value = gpio.LOW
        gpio.write(5,gpio.HIGH)
        gpio.write(6,gpio.LOW)
    end
end

gpio.mode(5, gpio.OUTPUT)
gpio.mode(6, gpio.OUTPUT)

tmr.alarm(0, 500, 1, toggleLED)
