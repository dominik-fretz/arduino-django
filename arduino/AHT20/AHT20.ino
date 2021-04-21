
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_AHTX0.h>
#include <WiFi.h>

const char* ssid     = "RobotoAP ";
const char* password = "1234567890";

#define I2C_SDA 17
#define I2C_SCL 16

TwoWire I2CAHT = TwoWire(0);
Adafruit_AHTX0 aht;

bool enableWifi = true;

unsigned long delayTime = 1000;

const char* host = "192.168.64.220";
const int httpPort = 8000;

const String url = "/api/sensorvalues/";


void setup() {
  bool status;

  Serial.begin(115200);
  I2CAHT.begin(I2C_SDA, I2C_SCL, 100000);
  status = aht.begin(&I2CAHT, 0);  
  if (!status) {
    Serial.println("Could not find a valid AHT20 sensor, check wiring!");
    while (1);
  }

  Serial.println("-- ATH20 test --");

  Serial.println();

  if (enableWifi) {

    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
  }

}

void sendValue(String sensor_type, float value) {

    // Use WiFiClient class to create TCP connections
    WiFiClient client;
    
    if (!client.connect(host, httpPort)) {
        Serial.println("connection failed");
        return;    
    }

    String payload = "";
    payload += "{";
    payload += "\"sensor_type\": \"" + sensor_type + "\",";
    payload += "\"value\":" + String(value);
    payload += "}";

    String command = String("POST ") + url + " HTTP/1.1\r\n" +
                 "Host: " + host + "\r\n" +
                 "Content-Type: application/json\r\n" + 
                 "Content-Length: " + payload.length() + "\r\n" +
                 "Connection: close\r\n" +
                 "\r\n" +
                 payload;

    // This will send the request to the server
    client.print(command);

}

void printValues() {
  sensors_event_t humidity, temp;
  aht.getEvent(&humidity, &temp);// populate temp and humidity objects with fresh data
  Serial.print("Temperature: "); Serial.print(temp.temperature); Serial.println(" degrees C");
  Serial.print("Humidity: "); Serial.print(humidity.relative_humidity); Serial.println("% rH");

  if (enableWifi) {
    sendValue("TMP", temp.temperature);
    sendValue("HUM", humidity.relative_humidity);
  }
}


void loop() { 
  printValues();
  delay(delayTime);
}

