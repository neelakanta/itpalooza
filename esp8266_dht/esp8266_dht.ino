#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"

#define DHTPIN D4
#define DHTTYPE DHT22   // DHT 22  (AM2302)
DHT dht(DHTPIN, DHTTYPE);

void setup() 
{
  Serial.begin(115200);
  Serial.println();
  Serial.println("Initializing DHT22");
  dht.begin();
}

void loop () 
{
  float h = dht.readHumidity();
  float t = dht.readTemperature(true); // true = return result in fahrenheit
  
  Serial.print("Temperature: ");
  Serial.print(t);
  
  Serial.print("  Humidity: ");
  Serial.println(h);

  delay(5 * 1000);
}
