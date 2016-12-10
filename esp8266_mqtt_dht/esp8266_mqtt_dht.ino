#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"

const char *wifi_ssid = "SSID";
const char *wifi_pass = "PASS";

//
// Publish to CloudMQTT
//
const int mqtt_port = 18644;
const char *mqtt_topic = "temp";
const char *mqtt_user = "USER";
const char *mqtt_pass = "PASS";
const char *mqtt_clientid = "ESP8266_DHT";
const char *mqtt_server = "m45.cloudmqtt.com";

#define DHTPIN D4
#define DHTTYPE DHT22   // DHT 22  (AM2302)
DHT dht(DHTPIN, DHTTYPE);


WiFiClient espClient;
PubSubClient client(espClient);

char msg[50];

void setup() 
{
  Serial.begin(115200);
  Serial.println();
  init_hw();
  connect_wifi();
  connect_mqtt();  
}

void init_hw()
{
  Serial.println("Initializing DHT22");
  dht.begin();
}

void connect_wifi()
{
  Serial.print("Connecting to Wifi SSID: ");
  Serial.println(wifi_ssid);
  
  WiFi.mode(WIFI_STA);
  WiFi.begin(wifi_ssid, wifi_pass);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("WiFi connected.\n IP Address: ");  
  Serial.println(WiFi.localIP());
}

void connect_mqtt()
{
  Serial.print("Connecting to MQTT Server: ");
  Serial.println(mqtt_server);
  
  client.setServer(mqtt_server, mqtt_port);
  
  if (client.connect(mqtt_clientid, mqtt_user, mqtt_pass)) {
    Serial.println("Connected to MQTT Server");
  } else {
    Serial.println("Failed to connect to MQTT Server");    
  } 
}

void publish_mqtt() 
{
  float h = dht.readHumidity();
  float t = dht.readTemperature(true);
  Serial.print("Temp/Humi: ");
  
  dtostrf(t,4,2,msg);
  Serial.print(msg);
  client.publish("temp", msg);
  
  dtostrf(h,4,2,msg);
  client.publish("humi", msg);
  Serial.print("/");
  Serial.println(msg);
}

void loop () 
{
  publish_mqtt();
  Serial.printf("Heap: %u\n", ESP.getFreeHeap());
  delay(5 * 1000);
}
